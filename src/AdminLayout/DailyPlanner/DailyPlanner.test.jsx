import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import DailyPlanner from './DailyPlanner';
import Axios from '../../api/axiosInterCepter';

jest.mock('../../api/axiosInterCepter', () => ({ get: jest.fn(), post: jest.fn(), patch: jest.fn(), delete: jest.fn() }));
const today = dayjs().format('YYYY-MM-DD');
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
const task = (changes = {}) => ({
  id: 'task-1',
  title: 'Apply to jobs',
  note: '',
  priority: 'normal',
  originalDate: today,
  activeDate: today,
  status: 'pending',
  version: 0,
  reviews: [{ date: today, target: 5, completed: 0, status: 'pending', remark: '' }],
  ...changes,
});

beforeEach(() => {
  jest.resetAllMocks();
  Axios.get.mockResolvedValue({ data: { tasks: [task()], backlog: [] } });
  Axios.post.mockResolvedValue({ data: { carried: 1 } });
  Axios.patch.mockResolvedValue({ data: {} });
});

test('tasks share a grid and long notes are collapsed until requested', async () => {
  Axios.get.mockResolvedValue({ data: { tasks: [task({ note: 'A long explanation of the SQL concept' }), task({ id: 'task-2', title: 'Study system design' })], backlog: [] } });
  render(<DailyPlanner />);
  const title = await screen.findByText('Apply to jobs');
  const second = screen.getByText('Study system design');
  expect(title.closest('article').parentElement).toHaveClass('dp-task-grid');
  expect(second.closest('article').parentElement).toBe(title.closest('article').parentElement);
  const note = screen.getByText('A long explanation of the SQL concept');
  const details = note.closest('details');
  expect(details).not.toHaveAttribute('open');
  fireEvent.click(screen.getByLabelText('Details for Apply to jobs'));
  expect(details).toHaveAttribute('open');
  fireEvent.click(screen.getByLabelText('Details for Apply to jobs'));
  expect(details).not.toHaveAttribute('open');
});

test('reviews partial job applications with a quantity and remark', async () => {
  render(<DailyPlanner />);
  fireEvent.click(await screen.findByRole('button', { name: 'Review Apply to jobs' }));
  const dialog = screen.getByRole('dialog');
  fireEvent.mouseDown(within(dialog).getByLabelText('Result'));
  fireEvent.click(screen.getByRole('option', { name: 'Partially done' }));
  fireEvent.change(within(dialog).getByLabelText(/How many did you complete today/), { target: { value: '3' } });
  fireEvent.change(within(dialog).getByLabelText('Remark / what to pick up next'), {
    target: { value: 'Two more tomorrow' },
  });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Save review' }));
  await waitFor(() =>
    expect(Axios.patch).toHaveBeenCalledWith(
      '/daily-planner/task-1/review',
      expect.objectContaining({ status: 'partial', completed: 3, remark: 'Two more tomorrow', version: 0 })
    )
  );
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('prepares tomorrow through the carry-forward API and loads tomorrow', async () => {
  render(<DailyPlanner />);
  await screen.findByText('Apply to jobs');
  fireEvent.click(await screen.findByRole('button', { name: 'Prepare tomorrow' }));
  await screen.findByRole('heading', { name: 'Tomorrow’s plan' });
  expect(Axios.post).toHaveBeenCalledWith('/daily-planner/carry-forward', expect.objectContaining({ date: tomorrow }));
  await waitFor(() =>
    expect(Axios.get).toHaveBeenLastCalledWith('/daily-planner', { params: expect.objectContaining({ date: tomorrow }) })
  );
  expect(screen.queryByRole('button', { name: 'Edit review for Apply to jobs' })).not.toBeInTheDocument();
});

test('history shows preserved remarks without review or removal actions', async () => {
  Axios.get.mockResolvedValue({
    data: {
      tasks: [
        task({
          activeDate: tomorrow,
          reviews: [
            { date: today, target: 5, completed: 3, status: 'partial', remark: 'Three applications sent' },
            { date: tomorrow, target: 2, completed: 0, status: 'pending', remark: '' },
          ],
        }),
      ],
      backlog: [],
    },
  });
  render(<DailyPlanner />);
  await screen.findByText('Three applications sent');
  fireEvent.click(screen.getByRole('button', { name: 'History' }));
  expect(screen.getByRole('heading', { name: 'Past plans & reflections' })).toBeInTheDocument();
  expect(screen.getByText('Three applications sent')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Add task' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Edit review for Apply to jobs' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Remove Apply to jobs' })).not.toBeInTheDocument();
});

test('an earlier pending task stays visible for review', async () => {
  Axios.get.mockResolvedValue({
    data: {
      tasks: [],
      backlog: [
        task({
          originalDate: yesterday,
          activeDate: yesterday,
          reviews: [{ date: yesterday, target: 5, completed: 0, status: 'pending', remark: '' }],
        }),
      ],
    },
  });
  render(<DailyPlanner />);
  expect(await screen.findByRole('button', { name: 'Review Apply to jobs' })).toBeEnabled();
  expect(screen.getByText('Earlier unfinished work')).toBeInTheDocument();
});

test('adding a task sends its target but no user selector', async () => {
  render(<DailyPlanner />);
  await screen.findByText('Apply to jobs');
  fireEvent.click(await screen.findByRole('button', { name: 'Add task' }));
  const dialog = screen.getByRole('dialog');
  fireEvent.change(within(dialog).getByLabelText(/What do you want to do/), { target: { value: 'SQL concept and notes' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Add to plan' }));
  await waitFor(() =>
    expect(Axios.post).toHaveBeenCalledWith(
      '/daily-planner',
      expect.objectContaining({ title: 'SQL concept and notes', target: 1, date: today })
    )
  );
  expect(Axios.post.mock.calls[0][1]).not.toHaveProperty('owner');
});

test('a failed save keeps the review dialog and entered remark', async () => {
  Axios.patch.mockRejectedValue({ response: { data: { message: 'Task changed. Refresh and try again.' } } });
  render(<DailyPlanner />);
  fireEvent.click(await screen.findByRole('button', { name: 'Review Apply to jobs' }));
  const dialog = screen.getByRole('dialog');
  fireEvent.change(within(dialog).getByLabelText('Remark / what to pick up next'), { target: { value: 'Keep this note' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Save review' }));
  expect(await within(dialog).findByText('Task changed. Refresh and try again.')).toBeInTheDocument();
  expect(within(dialog).getByLabelText('Remark / what to pick up next')).toHaveValue('Keep this note');
});

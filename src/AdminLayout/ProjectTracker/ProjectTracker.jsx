import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import "./projectTracker.css";
import {
  addProjectStepAction,
  addProjectStepComment,
  adminRoles,
  createProject,
  createProjectComponent,
  createProjectStep,
  downloadComponentReport,
  downloadProjectReport,
  getProject,
  getProjects,
  updateProject,
  updateProjectComponent,
  updateProjectStep,
} from "../../api/apiService";
import CustomizedSnackbars from "../../MainLayout/Components/ContactUS/CustomizedSnackbars";

function ProjectTracker() {
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState("");
  const [stepModalMode, setStepModalMode] = useState("create");
  const [activeStep, setActiveStep] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const role = JSON.parse(localStorage.getItem("userRole") || "\"\"");
  const isAdmin = adminRoles.includes(role);

  const openSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleDownload = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const downloadProjectPdf = async () => {
    if (!activeProjectId) return;
    try {
      const res = await downloadProjectReport(activeProjectId);
      handleDownload(res.data, "project-report.pdf");
    } catch (error) {
      openSnack("Failed to download project report", "error");
    }
  };

  const downloadComponentPdf = async (componentId) => {
    if (!activeProjectId || !componentId) return;
    try {
      const res = await downloadComponentReport(activeProjectId, componentId);
      handleDownload(res.data, "component-report.pdf");
    } catch (error) {
      openSnack("Failed to download component report", "error");
    }
  };

  const closeSnack = () => setSnack((prev) => ({ ...prev, open: false }));

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      setProjects(res.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openSnack("Failed to load projects", "error");
    }
  };

  const loadProjectDetail = async (projectId) => {
    if (!projectId) return;
    try {
      setLoading(true);
      const res = await getProject(projectId);
      setActiveProject(res.data);
      setActiveProjectId(projectId);
      if (res.data?.components?.length && !selectedComponentId) {
        setSelectedComponentId(res.data.components[0].id);
      }
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      openSnack("Failed to load project", "error");
      return null;
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      await createProject(payload);
      openSnack("Project created");
      event.target.reset();
      setShowProjectModal(false);
      await loadProjects();
    } catch (error) {
      openSnack("Failed to create project", "error");
    }
  };

  const handleProjectEdit = async () => {
    if (!activeProject?.project) return;
    const name = window.prompt("Project name", activeProject.project.name);
    if (!name) return;
    const dueDate = window.prompt(
      "Due date (DD-MM-YYYY)",
      activeProject.project.dueDate || ""
    );
    const description = window.prompt(
      "Description",
      activeProject.project.description || ""
    );

    try {
      await updateProject(activeProject.project.id, {
        name,
        dueDate: dueDate || "",
        description: description || "",
      });
      openSnack("Project updated");
      await loadProjects();
      await loadProjectDetail(activeProject.project.id);
    } catch (error) {
      openSnack("Failed to update project", "error");
    }
  };

  const handleComponentSubmit = async (event) => {
    event.preventDefault();
    if (!activeProjectId) return;
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      await createProjectComponent(activeProjectId, payload);
      openSnack("Component added");
      event.target.reset();
      setShowComponentModal(false);
      await loadProjectDetail(activeProjectId);
    } catch (error) {
      openSnack("Failed to add component", "error");
    }
  };

  const handleComponentEdit = async (component) => {
    const name = window.prompt("Component name", component.name);
    if (!name) return;
    const dueDate = window.prompt(
      "Due date (DD-MM-YYYY)",
      component.dueDate || ""
    );
    const description = window.prompt(
      "Description",
      component.description || ""
    );

    try {
      await updateProjectComponent(component.id, {
        name,
        dueDate: dueDate || "",
        description: description || "",
      });
      openSnack("Component updated");
      await loadProjectDetail(activeProjectId);
    } catch (error) {
      openSnack("Failed to update component", "error");
    }
  };

  const handleStepSubmit = async (event) => {
    event.preventDefault();
    const componentId = activeComponentId;
    if (!componentId) return;

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (stepModalMode === "edit" && activeStep) {
        await updateProjectStep(activeStep.id, payload);
        openSnack("Step updated");
      } else {
        await createProjectStep(componentId, payload);
        openSnack("Step added");
      }
      event.target.reset();
      setStepModalMode(activeStep ? "view" : "create");
      setActiveStep(null);
      if (stepModalMode === "edit") {
        setShowStepModal(false);
      }
      await loadProjectDetail(activeProjectId);
    } catch (error) {
      openSnack("Failed to save step", "error");
    }
  };

  const openStepModal = (componentId, step = null) => {
    setActiveComponentId(componentId);
    setActiveStep(step);
    setStepModalMode(step ? "view" : "create");
    setShowStepModal(true);
  };

  const handleStepStatus = async (event) => {
    const stepId = event.target.getAttribute("data-step");
    if (!stepId) return;

    try {
      await updateProjectStep(stepId, { status: event.target.value });
      await loadProjectDetail(activeProjectId);
    } catch (error) {
      openSnack("Failed to update step", "error");
    }
  };

  const handleNoteSubmit = async (event, type) => {
    event.preventDefault();
    const stepId = event.target.getAttribute("data-step");
    if (!stepId) return;

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (type === "action") {
        await addProjectStepAction(stepId, payload);
      } else {
        await addProjectStepComment(stepId, payload);
      }
      event.target.reset();
      const updated = await loadProjectDetail(activeProjectId);
      if (updated?.components && activeStep) {
        const nextStep =
          updated.components
            .flatMap((component) => component.steps || [])
            .find((step) => step.id === activeStep.id) || activeStep;
        setActiveStep(nextStep);
      }
    } catch (error) {
      openSnack("Failed to add note", "error");
    }
  };

  return (
    <div className="project-tracker">
      <div className="project-header">
        <div>
          <p className="project-eyebrow">Project Progress</p>
          <h1>Project Tracker</h1>
          <p className="project-subtitle">
            Track components, steps, and progress at a glance.
          </p>
        </div>
        <div className="project-cta">
          {loading && <span>Loading...</span>}
        </div>
      </div>

      <div className="project-grid">
        <section className="project-panel">
          <div className="panel-heading">
            <h2>Projects</h2>
            <span className="pill">{projects.length}</span>
          </div>
          <div className="project-list">
            {projects.length === 0 && (
              <div className="muted">No projects yet.</div>
            )}
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`project-card ${
                  activeProjectId === project.id ? "active" : ""
                }`}
                onClick={() => loadProjectDetail(project.id)}
              >
                <div className="project-card-title">{project.name}</div>
                <div className="muted">Due: {project.dueDate || "NA"}</div>
                <div className="progress">
                  <span
                    style={{ width: `${project.progress?.percent || 0}%` }}
                  />
                </div>
                <div className="muted">
                  {project.progress?.completedSteps || 0}/
                  {project.progress?.totalSteps || 0} steps
                </div>
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              type="button"
              className="btn-sm"
              onClick={() => setShowProjectModal(true)}
            >
              Create Project
            </button>
          )}
        </section>

        <section className="project-panel wide">
          {!activeProject && (
            <div className="empty-state">
              <h2>Select a project</h2>
              <p>Pick a project to view components and steps.</p>
            </div>
          )}
          {activeProject && (
            <div className="project-detail">
            <div className="project-detail-head">
              <div>
                <h2>{activeProject.project?.name}</h2>
                <div className="muted">
                  Due: {activeProject.project?.dueDate || "NA"}
                </div>
              </div>
              <div className="inline-actions">
                <button
                  type="button"
                  className="btn-sm btn-outline"
                  onClick={downloadProjectPdf}
                >
                  Project PDF
                </button>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  className="btn-sm btn-outline"
                  onClick={handleProjectEdit}
                  >
                    Edit Project
                  </button>
                )}
                <div className="detail-progress">
                  <div className="progress">
                    <span
                      style={{
                        width: `${activeProject.progress?.percent || 0}%`,
                      }}
                    />
                  </div>
                  <div className="muted">
                    {activeProject.progress?.completedSteps || 0}/
                    {activeProject.progress?.totalSteps || 0} steps
                  </div>
                </div>
              </div>

              {isAdmin && activeProject?.components?.length === 0 && (
                <button
                  type="button"
                  className="btn-sm"
                  onClick={() => setShowComponentModal(true)}
                >
                  Add Component
                </button>
              )}

              <div className="component-list">
                {activeProject.components?.length === 0 && (
                  <div className="muted">No components yet.</div>
                )}
                {activeProject.components?.length > 0 && (
                  <>
                    <div className="radial-topbar">
                      <span className="muted">
                        {activeProject.progress?.completedSteps || 0}/
                        {activeProject.progress?.totalSteps || 0} steps
                      </span>
                      {isAdmin && (
                        <button
                          type="button"
                          className="btn-sm"
                          onClick={() => setShowComponentModal(true)}
                        >
                          Add Component
                        </button>
                      )}
                    </div>
                    <div className="project-orbit">
                      {(() => {
                        const components = activeProject.components || [];
                        const leftCount = Math.ceil(components.length / 2);
                        const left = components.slice(0, leftCount);
                        const right = components.slice(leftCount);

                        const positions = (items, side) =>
                          items.map((component, index) => {
                            const percent = component.progress?.percent || 0;
                            const activityCount = (component.steps || []).reduce(
                              (acc, step) => {
                                const actionsCount = step.actions ? step.actions.length : 0;
                                const commentsCount = step.comments ? step.comments.length : 0;
                                return acc + Math.min(actionsCount, commentsCount);
                              },
                              0
                            );
                            const activityLevel =
                              activityCount >= 8
                                ? "high"
                                : activityCount >= 4
                                ? "mid"
                                : activityCount >= 1
                                ? "low"
                                : "none";
                            const statusClass =
                              percent >= 100
                                ? "done"
                                : percent >= 60
                                ? "mid"
                                : percent >= 30
                                ? "low"
                                : activityLevel === "low" || activityLevel === "mid" || activityLevel === "high"
                                ? "low"
                                : "idle";
                            const steps = items.length > 1 ? items.length - 1 : 1;
                            const top = 12 + (index / steps) * 76;
                            return {
                              component,
                              percent,
                              activityCount,
                              activityLevel,
                              statusClass,
                              top,
                              side,
                              index,
                            };
                          });

                        const leftPos = positions(left, "left");
                        const rightPos = positions(right, "right");

                        return (
                          <>
                            <svg className="orbit-lines" viewBox="0 0 100 100">
                              {[...leftPos, ...rightPos].map((item) => {
                                const x2 = item.side === "left" ? 12 : 88;
                                const x1 = 50;
                                const y2 = item.top;
                                const percent = item.percent || 0;
                                const stroke =
                                  percent >= 100
                                    ? "#22c55e"
                                    : percent >= 60
                                    ? "#f97316"
                                    : percent >= 30
                                    ? "#fbbf24"
                                    : item.activityLevel === "high"
                                    ? "#f59e0b"
                                    : item.activityLevel === "mid"
                                    ? "#fbbf24"
                                    : item.activityLevel === "low"
                                    ? "#fde047"
                                    : "#cbd5e1";
                                const strokeWidth =
                                  1.2 +
                                  (percent / 100) * 2.8 +
                                  Math.min(item.activityCount, 10) * 0.12;
                                return (
                                  <line
                                    key={item.component.id}
                                    x1={x1}
                                    y1="50"
                                    x2={x2}
                                    y2={y2}
                                    stroke={stroke}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                  />
                                );
                              })}
                            </svg>

                            <div className="project-center">
                              <div className="project-center-inner">Project</div>
                            </div>

                            <div className="orbit-side left">
                              {leftPos.map((item, index) => (
                                <button
                                  key={item.component.id}
                                  type="button"
                                  className={`orbit-pill status-${item.statusClass} ${
                                    selectedComponentId === item.component.id ? "active" : ""
                                  } activity-${item.activityLevel}`}
                                  style={{ top: `${item.top}%` }}
                                  onClick={() => setSelectedComponentId(item.component.id)}
                                >
                                  <span className="orbit-index">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                              <span className="orbit-title">{item.component.name}</span>
                                  {item.activityCount > 0 && (
                                    <span className="orbit-activity">
                                      {item.activityCount}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>

                            <div className="orbit-side right">
                              {rightPos.map((item, index) => (
                                <button
                                  key={item.component.id}
                                  type="button"
                                  className={`orbit-pill status-${item.statusClass} ${
                                    selectedComponentId === item.component.id ? "active" : ""
                                  } activity-${item.activityLevel}`}
                                  style={{ top: `${item.top}%` }}
                                  onClick={() => setSelectedComponentId(item.component.id)}
                                >
                                  <span className="orbit-title">{item.component.name}</span>
                                  {item.activityCount > 0 && (
                                    <span className="orbit-activity">
                                      {item.activityCount}
                                    </span>
                                  )}
                                  <span className="orbit-index">
                                    {String(index + 1 + leftCount).padStart(2, "0")}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {activeProject.components.map((component) => {
                      if (component.id !== selectedComponentId) return null;
                      return (
                        <div key={component.id} className="component-card">
                          <div className="component-head">
                            <div>
                              <h3>{component.name}</h3>
                              <div className="muted">
                                Due: {component.dueDate || "NA"}
                              </div>
                            </div>
                        {isAdmin && (
                          <button
                            type="button"
                            className="btn-sm btn-outline"
                            onClick={() => handleComponentEdit(component)}
                          >
                            Edit Component
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn-sm btn-outline"
                          onClick={() => downloadComponentPdf(component.id)}
                        >
                          Component PDF
                        </button>
                        <div className="detail-progress">
                          <div className="progress">
                            <span
                              style={{
                                    width: `${component.progress?.percent || 0}%`,
                                  }}
                                />
                              </div>
                              <div className="muted">
                                {component.progress?.completedSteps || 0}/
                                {component.progress?.totalSteps || 0} steps
                              </div>
                            </div>
                          </div>

                          <div className="step-list">
                            {component.steps?.length === 0 && (
                              <div className="muted">No steps yet.</div>
                            )}
                            <div className="step-flow">
                              {component.steps?.map((step, index) => (
                                <React.Fragment key={step.id}>
                                  <button
                                    type="button"
                                    className={`step-pill status-${step.status}`}
                                    onClick={() =>
                                      openStepModal(component.id, step)
                                    }
                                  >
                                    <span>{step.title}</span>
                                    <span className="badge">{step.status}</span>
                                  </button>
                                  {index < component.steps.length - 1 && (
                                    <span className="step-arrow">→</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          {isAdmin && (
                            <button
                              type="button"
                              className="btn-sm"
                              onClick={() => {
                                openStepModal(component.id);
                              }}
                            >
                              Add Step
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {showProjectModal && (
        <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Create Project</h3>
              <button
                type="button"
                className="btn-sm btn-outline"
                onClick={() => setShowProjectModal(false)}
              >
                Close
              </button>
            </div>
            <form className="project-form" onSubmit={handleProjectSubmit}>
              <input name="name" placeholder="Project name" required />
              <input name="dueDate" placeholder="Due date (DD-MM-YYYY)" />
              <textarea name="description" placeholder="Description" />
              <button type="submit" className="btn-sm">
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {showComponentModal && (
        <div className="modal-overlay" onClick={() => setShowComponentModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Add Component</h3>
              <button
                type="button"
                className="btn-sm btn-outline"
                onClick={() => setShowComponentModal(false)}
              >
                Close
              </button>
            </div>
            <form className="project-form" onSubmit={handleComponentSubmit}>
              <input name="name" placeholder="Component name" required />
              <input name="dueDate" placeholder="Due date (DD-MM-YYYY)" />
              <textarea name="description" placeholder="Description" />
              <button type="submit" className="btn-sm">
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {showStepModal && (
        <div className="modal-overlay" onClick={() => setShowStepModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>
                {stepModalMode === "edit"
                  ? "Update Step"
                  : stepModalMode === "view"
                  ? "Step Details"
                  : "Add Step"}
              </h3>
              <button
                type="button"
                className="btn-sm btn-outline"
                onClick={() => setShowStepModal(false)}
              >
                Close
              </button>
            </div>
            {(stepModalMode === "create" || stepModalMode === "edit") && (
              <form className="project-form" onSubmit={handleStepSubmit}>
                <input
                  name="title"
                  placeholder="Step title"
                  required
                  defaultValue={activeStep?.title || ""}
                  readOnly={!isAdmin}
                />
                <input
                  name="dueDate"
                  placeholder="Due date (DD-MM-YYYY)"
                  defaultValue={activeStep?.dueDate || ""}
                  readOnly={!isAdmin}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  defaultValue={activeStep?.description || ""}
                  readOnly={!isAdmin}
                />
                {isAdmin && (
                  <>
                    <label className="muted">Status</label>
                    <select
                      name="status"
                      defaultValue={activeStep?.status || "todo"}
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </>
                )}
                <input
                  name="remarks"
                  placeholder="Remarks"
                  defaultValue={activeStep?.remarks || ""}
                  readOnly={!isAdmin}
                />
                {isAdmin && (
                  <button type="submit" className="btn-sm">
                    {stepModalMode === "edit" ? "Update" : "Add"}
                  </button>
                )}
              </form>
            )}

            {stepModalMode === "view" && activeStep && (
              <>
                <div className="detail-row">
                  <strong>{activeStep.title}</strong>
                  <span className="badge">{activeStep.status}</span>
                </div>
                <div className="muted">Due: {activeStep.dueDate || "NA"}</div>
                <div className="muted">
                  Remarks: {activeStep.remarks || "None"}
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    className="btn-sm btn-outline"
                    onClick={() => setStepModalMode("edit")}
                  >
                    Edit Step
                  </button>
                )}
              </>
            )}

            {stepModalMode === "view" && activeStep && (
              <div className="modal-notes">
                <div>
                  <h4>Actions</h4>
                  <div className="note-list">
                    {(activeStep.actions || []).map((note, index) => (
                      <div key={`${activeStep.id}-a-${index}`}>
                        Action: {note.text}
                      </div>
                    ))}
                    {(activeStep.actions || []).length === 0 && (
                      <div>No actions yet.</div>
                    )}
                  </div>
                  {isAdmin && (
                    <form
                      className="mini-form"
                      data-step={activeStep.id}
                      onSubmit={(event) => handleNoteSubmit(event, "action")}
                    >
                      <input name="text" placeholder="Add action" required />
                      <button type="submit" className="btn-sm">
                        Add Action
                      </button>
                    </form>
                  )}
                </div>
                <div>
                  <h4>Comments</h4>
                  <div className="note-list">
                    {(activeStep.comments || []).map((note, index) => (
                      <div key={`${activeStep.id}-c-${index}`}>
                        Comment: {note.text}
                      </div>
                    ))}
                    {(activeStep.comments || []).length === 0 && (
                      <div>No comments yet.</div>
                    )}
                  </div>
                  {isAdmin && (
                    <form
                      className="mini-form"
                      data-step={activeStep.id}
                      onSubmit={(event) => handleNoteSubmit(event, "comment")}
                    >
                      <input name="text" placeholder="Add comment" required />
                      <button type="submit" className="btn-sm">
                        Add Comment
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CustomizedSnackbars
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={closeSnack}
      />
    </div>
  );
}

export default LayoutAdmin(ProjectTracker, "project-tracker");

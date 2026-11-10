import React, { useState } from "react";
import "./WithdrawModal.css"; // make sure to import the CSS
import { createWithDrawRequest } from "../../api/apiService";
import { formatCurrency } from "../../utils/common";

const WithdrawModal = ({ isOpen, onClose, onSubmit, userId, available }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setAmount("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (value > Number(available || 0)) {
      setError(`Only ${formatCurrency(available)} is available to withdraw`);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await createWithDrawRequest({ userId, amount: value });
      setAmount("");
      onSubmit(value);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create withdraw request");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Withdraw Amount</h2>
        <p>Earnings available: {formatCurrency(available)}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            step="any"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && (
            <p role="alert" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}
          <div className="modal-buttons">
            <button type="button" onClick={handleClose} className="btn cancel">
              Cancel
            </button>
            <button type="submit" className="btn submit" disabled={submitting}>
              {submitting ? "Sending..." : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;

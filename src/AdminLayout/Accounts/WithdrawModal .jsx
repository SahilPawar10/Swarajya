import React, { useState } from "react";
import "./WithdrawModal.css"; // make sure to import the CSS
import { createWithDrawRequest } from "../../api/apiService";

const WithdrawModal = ({ isOpen, onClose, onSubmit, savingId }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    createWithDrawRequest({ savingId, amount })
      .then((res) => console.log(res))
      .catch((err) => alert(err.response.data));
    e.preventDefault();

    onSubmit(amount);
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;
  if (!savingId) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Withdraw Amount</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn cancel">
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawModal;

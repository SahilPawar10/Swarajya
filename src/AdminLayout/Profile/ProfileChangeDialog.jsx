// ProfileChangeDialog.js
import React, { useState } from "react";
import Modal from "react-modal";
import "./profile.css";
import { changeProfile } from "../../api/apiService";

Modal.setAppElement("#root");

const ProfileChangeDialog = ({ isOpen, onClose, profileId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        console.log(
          " Image is too large. Please select an image smaller than 10MB."
        );
        console.log("");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("called: ", reader);
        setProfileImage(reader.result);
      };
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a valid image file (PNG, JPG, JPEG).");
    }
  };

  const handleUpload = async () => {
    // Handle the file upload logic here
    // console.log('File to be uploaded:', selectedFile);
    // console.log('image:',profileId);
    setLoading(true);
    const data = {
      userId: profileId,
      imageString: profileImage,
    };

    await changeProfile(data)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Change Profile Photo"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Change Profile Photo</h2>
      <div className="upload-container">
        <div className="upload-area">
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        {loading ? "Uploading... wait !" : "Upload"}
      </button>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
};

export default ProfileChangeDialog;

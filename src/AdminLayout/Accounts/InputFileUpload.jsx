// InputFileUpload.jsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({
  onFilesSelected,
  label = "Upload files",
}) {
  const inputRef = React.useRef();

  const handleChange = (event) => {
    const files = event.target.files;
    if (onFilesSelected && files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input value to allow re-uploading the same file
    event.target.value = null;
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <VisuallyHiddenInput
        ref={inputRef}
        type="file"
        onChange={handleChange}
        multiple
      />
    </Button>
  );
}

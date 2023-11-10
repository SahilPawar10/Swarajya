import React, { useState } from "react";
import "./vision.css";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import FormControlLabel from "@mui/material/FormControlLabel";

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

function Vision() {
  const [checked, setChecked] = useState(false);

  //   const handleChange = () => {
  //     setChecked((prev) => !prev);
  //   };

  const displayVission = () => {
    if (window.scrollY >= 50) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  window.addEventListener("scroll", displayVission);

  return (
    <div id="vision">
      <Box sx={{ height: 180 }}>
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        /> */}
        <Box sx={{ display: "flex" }}>
          <Zoom in={checked}>{icon}</Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "500ms" : "0ms" }}
          >
            {icon}
          </Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "1000ms" : "0ms" }}
          >
            {icon}
          </Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "1500ms" : "0ms" }}
          >
            {icon}
          </Zoom>
        </Box>
      </Box>
    </div>
  );
}

export default Vision;

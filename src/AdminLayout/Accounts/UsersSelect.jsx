import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { getUserWithoutPhoto } from "../../api/apiService";

const ITEM_HEIGHT = 48;
const MENU_HEIGHT = 6 * ITEM_HEIGHT; // Show 6 items before scrolling

export default function UserSelect({ selectedUser, handleUserChange }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = React.useState("user");
  const [userId, setUserId] = React.useState();

  const getAllUsers = async () => {
    getUserWithoutPhoto()
      .then((res) => {
        const users = res.data;
        setUsers(users);
        // ✅ Auto-select the first user

        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "err");
        setLoading(false);
      });
    // setRole("admin");
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setRole(JSON.parse(role));

    if (role === "user") {
      const userId = localStorage.getItem("userId");
      setUserId(JSON.parse(userId));
    }
    // Replace with your real API URL
    getAllUsers();
  }, []);

  return (
    <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "20px" }}>
      <InputLabel id="user-select-label">Select User</InputLabel>
      <Select
        labelId="user-select-label"
        id="user-select"
        name="member"
        value={selectedUser}
        label="Select User"
        onChange={handleUserChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: MENU_HEIGHT,
              overflowY: "auto",
            },
          },
        }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
          </MenuItem>
        ) : (
          users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.firstName + " " + user.lastName}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}

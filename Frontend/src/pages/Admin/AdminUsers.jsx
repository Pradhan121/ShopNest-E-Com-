import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = () => {
    axios
      .get("http://localhost:3000/api/admin/users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    axios
      .delete(`http://localhost:3000/api/admin/users/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("User Deleted");

        getUsers();
      })
      .catch(console.log);
  };

  const filteredUsers = users.filter(
    (item) =>
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Typography
        sx={{
          color: "#fff",
          fontSize: 30,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Users
      </Typography>

      <TextField
        fullWidth
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          background: "#fff",
          borderRadius: 2,
        }}
      />

      <TableContainer
        component={Paper}
        sx={{
          background: "#0F172A",
          border: "1px solid #1E293B",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Username</TableCell>

              <TableCell sx={{ color: "#fff" }}>Email</TableCell>

              <TableCell sx={{ color: "#fff" }}>Role</TableCell>

              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ color: "#fff" }}>{user.username}</TableCell>

                <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === "admin" ? "error" : "primary"}
                  />
                </TableCell>

                <TableCell>
                  {user.role === "admin" ? (
                    <Typography
                      sx={{
                        color: "#64748B",
                      }}
                    >
                      Protected
                    </Typography>
                  ) : (
                    <IconButton onClick={() => deleteUser(user._id)}>
                      <DeleteIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

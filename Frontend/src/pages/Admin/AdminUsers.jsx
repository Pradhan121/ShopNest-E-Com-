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
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          width: { xs: "100%", sm: "350px" },

          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: 2,

            "& fieldset": {
              borderColor: "#E2E8F0",
            },

            "&:hover fieldset": {
              borderColor: "#94A3B8",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
            },
          },
        }}
      />

      <TableContainer
        component={Paper}
        sx={{
          background: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#94A3B8",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  width: "25%",
                }}
              >
                Username
              </TableCell>

              <TableCell
                sx={{
                  color: "#94A3B8",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  width: "35%",
                }}
              >
                Email
              </TableCell>

              <TableCell
                sx={{
                  color: "#94A3B8",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  width: "20%",
                }}
              >
                Role
              </TableCell>

              <TableCell
                sx={{
                  color: "#94A3B8",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  width: "20%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  transition: "background-color 0.2s ease",

                  "&:hover": {
                    backgroundColor: "#172033",
                  },

                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell
                  sx={{
                    color: "#F8FAFC",
                    fontWeight: 500,
                  }}
                >
                  {user.username}
                </TableCell>

                <TableCell
                  sx={{
                    color: "#CBD5E1",
                  }}
                >
                  {user.email}
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      backgroundColor:
                        user.role === "admin" ? "#DC2626" : "#2563EB",
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      borderRadius: 1.5,
                    }}
                  />
                </TableCell>

                <TableCell>
                   
                    <IconButton
                      onClick={() => deleteUser(user._id)}
                      sx={{
                        color: "#EF4444",

                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.12)",
                        },
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          color: "#EF4444",
                          fontSize: 21,
                        }}
                      />
                    </IconButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

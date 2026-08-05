import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockResetIcon from "@mui/icons-material/LockReset";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch(console.log);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = () => {
    axios
      .patch("http://localhost:3000/api/profile", user, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  const handleClose = () =>{
    navigate('/admin/dashboard')
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#020617",
        py: 4,
      }}
    >
      <Container maxWidth="md">

        <Paper
          sx={{
            background: "#0F172A",
            border: "1px solid #1E293B",
            borderRadius: 4,
            p: 5,
            color: "#fff",
            position:'relative'
          }}
        >
          {/* Header */}
          <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
              }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#2563EB",
              }}
            >
              <AdminPanelSettingsIcon
                sx={{ fontSize: 55 }}
              />
            </Avatar>

            <Typography
              sx={{
                mt: 2,
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              {user.username}
            </Typography>

            <Typography
              sx={{
                color: "#94A3B8",
                mt: 1,
              }}
            >
              {user.email}
            </Typography>

            <Chip
              label="Administrator"
              color="error"
              sx={{
                mt: 2,
                fontWeight: 600,
              }}
            />
          </Box>

          <Divider
            sx={{
              my: 4,
              borderColor: "#1E293B",
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              mb: 3,
            }}
          >
            Personal Information
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Role"
            value={user.role}
            disabled
            sx={textFieldStyle}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              height: 48,
            }}
            onClick={updateProfile}
          >
            UPDATE PROFILE
          </Button>

          <Divider
            sx={{
              my: 4,
              borderColor: "#1E293B",
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              mb: 2,
            }}
          >
            Security
          </Typography>

          <Button
            startIcon={<LockResetIcon />}
            variant="outlined"
            color="warning"
            onClick={() => navigate("/settings")}
          >
            Change Password
          </Button>

          <Divider
            sx={{
              my: 4,
              borderColor: "#1E293B",
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              mb: 2,
            }}
          >
            Account Information
          </Typography>

          <Typography sx={{ color: "#94A3B8", mb: 1 }}>
            Role : Administrator
          </Typography>

          <Typography sx={{ color: "#94A3B8", mb: 1 }}>
            Access Level : Full Access
          </Typography>

          <Typography sx={{ color: "#94A3B8" }}>
            Status : Active
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
}

const textFieldStyle = {
  input: {
    color: "#fff",
  },

  label: {
    color: "#94A3B8",
  },

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#fff",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#334155",
    },

    "&:hover fieldset": {
      borderColor: "#2563EB",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
    },
  },
};
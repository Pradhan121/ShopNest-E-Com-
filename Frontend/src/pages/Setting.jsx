import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../componrnts/Navbar";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminNavbar from "../componrnts/Admin/AdminNavbar";

export default function Settings() {
  const { logout } = useContext(AuthContext);
  const role = localStorage.getItem('role')
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    axios
      .patch(
        "http://localhost:3000/api/profile/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )
      .then((res) => {
        toast.success("Password updated successfully");

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleLogout = () => {
    setOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpen(false);
  };

  const confirmLogout = () => {
    logout();
    navigate("/");
  };

  const handleClickCurrentPassword = () => {
    setShowCurrent((prev) => !prev);
  };

  const handleClickNewPassword = () => {
    setShowNew((prev) => !prev);
  };
  const handleClickConfirmPassword = () => {
    setShowConfirm((prev) => !prev);
  };
  const handleClose = () => {
     if(role==='admin'){
      navigate('/admin/dashboard')
     }
     else{
       navigate('/homePage')
     }
  };
  return (
    <>

      {role === 'admin' ? <AdminNavbar/> : <Navbar/>}

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#020617,#0F172A)",
          py: 5,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
              background: "#0F172A",
              border: "1px solid #1E293B",
              color: "#fff",
              position: "relative",
            }}
          >
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
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
                mb: 3,
              }}
            >
              ⚙ Settings
            </Typography>

            <TextField
              fullWidth
              type={showCurrent ? "text" : "password"}
              label="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              margin="normal"
              sx={textFieldStyle}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickCurrentPassword}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              type={showNew ? "text" : "password"}
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              margin="normal"
              sx={textFieldStyle}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickNewPassword}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              type={showConfirm ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              sx={textFieldStyle}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickConfirmPassword}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              fullWidth
              sx={{ mt: 3 }}
              variant="contained"
              onClick={updatePassword}
            >
              Update Password
            </Button>

            <Button
              fullWidth
              color="error"
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Paper>
          <Dialog open={open} onClose={handleCloseLogoutDialog}>
            <DialogTitle sx={{textAlign: 'center', fontSize:'30px'}}>Logout</DialogTitle>

            <DialogContent>
              <DialogContentText>
                Are you sure you want to logout ?
              </DialogContentText>
            </DialogContent>

            <DialogActions sx={{justifyContent:'space-evenly'}}>
              <Button  variant='contained' onClick={handleCloseLogoutDialog}>Cancel</Button>

              <Button color="error" variant="contained" onClick={confirmLogout}>
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}

const textFieldStyle = {
  mb: 3,
  input: {
    color: "#fff",
  },
  label: {
    color: "#94A3B8",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",

    "& fieldset": {
      borderColor: "#334155",
    },

    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",
    },
  },
};

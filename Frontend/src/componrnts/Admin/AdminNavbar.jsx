import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminNavbar() {
  const[open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setAnchorEl(null)
    setOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#0F172A",
        boxShadow: "none",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Toolbar>
        {/* Left */}

        <Typography
          sx={{
            flexGrow: 1,
            color: "#94A3B8",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Welcome Back 👋
        </Typography>

        {/* Right */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton sx={{ color: "#fff" }}>
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={openMenu}>
            <Avatar />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            PaperProps={{
              sx: {
                background: "#0F172A",
                color: "#fff",
                border: "1px solid #1E293B",
                borderRadius: "10px",
                minWidth: 180,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/admin/profile");
                setAnchorEl(null)
                closeMenu();
              }}
            >
              My Profile
            </MenuItem>

            <MenuItem sx={{ color: "#EF4444" }} 
                onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Dialog open={open} onClose={handleCloseLogoutDialog}>
        <DialogTitle sx={{ textAlign: "center", fontSize: "30px" }}>
          Logout
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout ?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-evenly" }}>
          <Button variant="contained" onClick={handleCloseLogoutDialog}>
            Cancel
          </Button>

          <Button color="error" variant="contained" onClick={confirmLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

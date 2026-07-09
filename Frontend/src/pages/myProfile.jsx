import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../componrnts/Navbar";

export default function MyProfile() {
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
         setUser({
        ...res.data.data.user,
        orderCount: res.data.data.orderCount,
        cartCount: res.data.data.cartCount,
        wishlistCount: res.data.data.wishlistCount
    })
      })
      .catch((err) => console.log(err));
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
        alert("Profile Updated Successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#0F172A)",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            background: "rgba(15,23,42,.95)",
            border: "1px solid #1E293B",
            borderRadius: "18px",
            p: 5,
            color: "#fff",
          }}
        >
          {/* Top */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#2563EB",
              }}
            >
              <PersonIcon sx={{ fontSize: 55 }} />
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
              }}
            >
              {user.email}
            </Typography>

            <Chip
              label={user.role.toUpperCase()}
              color="primary"
              sx={{
                mt: 2,
              }}
            />
          </Box>

          {/* Personal Info */}

          <Typography
            sx={{
              mt: 5,
              mb: 3,
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Personal Information
          </Typography>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            margin="normal"
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            label="Role"
            value={user.role}
            //disabled
            margin="normal"
            sx={textFieldStyle}
          />

          <Button
            fullWidth
            onClick={updateProfile}
            sx={{
              mt: 4,
              height: 50,
              fontWeight: 700,
              background:
                "linear-gradient(90deg,#2563EB,#3B82F6)",
              color: "#fff",

              "&:hover": {
                background:
                  "linear-gradient(90deg,#1D4ED8,#2563EB)",
              },
            }}
          >
            UPDATE PROFILE
          </Button>

          {/* Stats */}

          <Box
            sx={{
              mt: 6,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Paper sx={cardStyle}>
              <ShoppingBagIcon
                sx={{
                  fontSize: 35,
                  color: "#60A5FA",
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  color: "#fff",
                }}
              >
                Orders
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {user.orderCount}
              </Typography>
            </Paper>

            <Paper sx={cardStyle}>
              <FavoriteIcon
                sx={{
                  fontSize: 35,
                  color: "#EF4444",
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  color: "#fff",
                }}
              >
                Wishlist
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {user.wishlistCount}
              </Typography>
            </Paper>

            <Paper sx={cardStyle}>
              <ShoppingCartIcon
                sx={{
                  fontSize: 35,
                  color: "#22C55E",
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  color: "#fff",
                }}
              >
                Cart
              </Typography>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {user.cartCount}
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
    </>
  );
}

const textFieldStyle = {
  input: {
    color: "#fff",
  },

  label: {
    color: "#94A3B8",
  },

  "& .MuiOutlinedInput-root": {
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

const cardStyle = {
  background: "#0F172A",
  border: "1px solid #1E293B",
  color: "#fff",
  p: 3,
  textAlign: "center",
  borderRadius: "12px",
};

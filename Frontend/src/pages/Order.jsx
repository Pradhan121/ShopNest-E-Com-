import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Order() {
  const [cart, setCart] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setCart(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const total =
    cart?.items?.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0,
    ) || 0;

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617, #0F172A)",
          py: 5,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
              mt: 4,
            }}
          >
            <Box
              sx={{
                background: "rgba(15,23,42,0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                border: "1px solid #1E293B",
                borderRadius: "12px",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  mb: 3,
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                🚚 Delivery Information
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                name="fullName"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />

              <TextField
                fullWidth
                label="Phone"
                margin="normal"
                name="phone"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />

              <TextField
                fullWidth
                label="Address"
                margin="normal"
                multiline
                rows={3}
                name="address"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />

              <TextField
                fullWidth
                label="City"
                margin="normal"
                name="city"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />

              <TextField
                fullWidth
                label="State"
                margin="normal"
                name="state"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />

              <TextField
                fullWidth
                label="Pincode"
                margin="normal"
                name="pincode"
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  label: { color: "#94A3B8" },
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
                }}
              />
            </Box>
            <Box
              sx={{
                background: "rgba(15,23,42,0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                border: "1px solid #1E293B",
                borderRadius: "12px",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  mb: 3,
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                📦 Order Summary
              </Typography>

              {cart?.items?.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`http://localhost:3000/images/${item.productId.image}`}
                      width="80"
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                    <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                      {item.productId.title}
                    </Typography>

                    <Typography sx={{ color: "#94A3B8" }}>
                      Qty: {item.quantity}
                    </Typography>
                  </Box>

                  <Typography sx={{ color: "#60A5FA" }}>
                    ₹ {item.productId.price * item.quantity}
                  </Typography>
                </Box>
              ))}

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "24px",
                  fontWeight: 700,
                  mt: 3,
                }}
              >
                Total: ₹ {total}
              </Typography>

              <Button
                fullWidth
                sx={{
                  mt: 3,
                  height: "50px",
                  fontWeight: 700,
                  borderRadius: "12px",
                  background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(90deg,#1D4ED8,#2563EB)",
                  },
                }}
              >
                PLACE ORDER 🚀
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

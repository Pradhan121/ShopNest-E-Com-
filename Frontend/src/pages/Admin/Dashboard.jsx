import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/dashboard", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      subtitle: "Available Products",
      color: "#2563EB",
      icon: <InventoryIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      subtitle: "All Orders",
      color: "#22C55E",
      icon: <ShoppingCartIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      subtitle: "Registered Users",
      color: "#F59E0B",
      icon: <PeopleIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: "Revenue",
      value: `₹ ${dashboard.totalRevenue}`,
      subtitle: "Total Earnings",
      color: "#EF4444",
      icon: <PaymentsIcon sx={{ fontSize: 42 }} />,
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography
        sx={{
          color: "#fff",
          fontSize: 34,
          fontWeight: 700,
          mb: 4,
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: "#111827",
                border: "1px solid #1E293B",
                position: "relative",
                overflow: "hidden",
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: item.color,
                  boxShadow: `0 10px 30px ${item.color}30`,
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 6,
                  height: "100%",
                  background: item.color,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#94A3B8",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#fff",
                      fontSize: 34,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#64748B",
                      fontSize: 13,
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 65,
                    height: 65,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 5,
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(135deg,#111827,#1E293B)",
          border: "1px solid #334155",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Welcome Back 👋
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#94A3B8",
            lineHeight: 2,
            fontSize: 15,
          }}
        >
          Manage products, track orders, monitor users and grow your ShopNest
          store from a single dashboard.
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button variant="contained">Add Product</Button>

          <Button variant="outlined">View Orders</Button>
        </Box>
      </Paper>
    </>
  );
}

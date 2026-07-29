import { useEffect, useState } from "react";
import axios from "axios";

import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";

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
      icon: <InventoryIcon sx={{ fontSize: 45, color: "#3B82F6" }} />,
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      icon: <ShoppingCartIcon sx={{ fontSize: 45, color: "#22C55E" }} />,
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 45, color: "#F59E0B" }} />,
    },
    {
      title: "Revenue",
      value: `₹ ${dashboard.totalRevenue}`,
      icon: <PaymentsIcon sx={{ fontSize: 45, color: "#EF4444" }} />,
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
          fontSize: 32,
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
                background: "#0F172A",
                color: "#fff",
                p: 3,
                borderRadius: "16px",
                border: "1px solid #1E293B",
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,.4)",
                  borderColor: "#2563EB",
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
                      fontSize: 15,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: 30,
                      fontWeight: 700,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>

                {item.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 5,
          p: 4,
          background: "#0F172A",
          color: "#fff",
          border: "1px solid #1E293B",
          borderRadius: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            mb: 2,
          }}
        >
          Welcome Admin 👋
        </Typography>

        <Typography sx={{ color: "#94A3B8" }}>
          Welcome to the ShopNest Admin Dashboard. Here you can manage products,
          orders, users, and monitor your store performance.
        </Typography>
      </Paper>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

import { Avatar, Box, Button, Chip, CircularProgress, Divider, Grid, Paper, Stack, Typography } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import DotLoader from "../../componrnts/DotLoader";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentProducts: [],
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
      color: "#3B82F6",
      icon: <InventoryIcon />,
      path: "/admin/products",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      subtitle: "All Orders",
      color: "#22C55E",
      icon: <ShoppingCartIcon />,
      path: "/admin/orders",
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      subtitle: "Registered Users",
      color: "#F59E0B",
      icon: <PeopleIcon />,
      path: "/admin/users",
    },
    {
      title: "Revenue",
      value: `₹ ${dashboard.totalRevenue}`,
      subtitle: "Total Earnings",
      color: "#EF4444",
      icon: <PaymentsIcon />,
      path: "/admin/orders",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DotLoader label="Loading dashboard" size={10} />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 5 }}>

      {/* Header */}

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: {
              xs: 28,
              md: 34,
            },
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 14,
          }}
        >
          Here's what's happening with your store today.
        </Typography>
      </Box>

      {/* Statistics Cards */}

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {cards.map((item) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
            key={item.title}
          >
            <Paper
             onClick = {()=>navigate(item.path)}
              sx={{
                minHeight: 145,
                p: 3,
                borderRadius: 3,
                background: "#111827",
                border: "1px solid #1E293B",
                position: "relative",
                overflow: "hidden",

                transition: "all .25s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: item.color,
                  boxShadow: `0 12px 35px ${item.color}20`,
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 4,
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
                  height: "100%",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#94A3B8",
                      fontSize: 14,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 30,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: 12,
                      mt: 1,
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    background: `${item.color}15`,
                  }}
                >
                  {item.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Section */}

      <Grid container spacing={3}>

        {/* Recent Orders */}

        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper
            sx={{
              background: "#111827",
              border: "1px solid #1E293B",
              borderRadius: 3,
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Recent Orders
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: 12,
                    mt: 0.5,
                  }}
                >
                  Latest customer orders
                </Typography>
              </Box>

              <Chip
                label={`${dashboard.recentOrders?.length || 0} Orders`}
                size="small"
                sx={{
                  color: "#22C55E",
                  background: "#22C55E12",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "#1E293B" }} />

            {dashboard.recentOrders?.length > 0 ? (
              dashboard.recentOrders.map((order) => (
                <Box
                  key={order._id}
                  sx={{
                    px: 3,
                    py: 2.2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    "&:hover": {
                      background: "#172033",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      {order.userId?.username}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        fontSize: 12,
                        mt: 0.5,
                      }}
                    >
                      {order.products?.[0]?.productId?.title || "Product"}
                      {order.products?.length > 1 &&
                        ` +${order.products.length - 1} more`}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      ₹ {order.totalAmount}
                    </Typography>

                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        height: 24,
                        fontSize: 11,
                        color:
                          order.status === "Delivered"
                            ? "#22C55E"
                            : order.status === "Cancelled"
                              ? "#EF4444"
                              : "#F59E0B",
                        background:
                          order.status === "Delivered"
                            ? "#22C55E15"
                            : order.status === "Cancelled"
                              ? "#EF444415"
                              : "#F59E0B15",
                      }}
                    />
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ px: 3, py: 5 }}>
                <Typography
                  sx={{
                    color: "#64748B",
                    textAlign: "center",
                  }}
                >
                  No orders found.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Users */}

        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper
            sx={{
              background: "#111827",
              border: "1px solid #1E293B",
              borderRadius: 3,
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Box sx={{ px: 3, py: 2.5 }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Recent Users
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: 12,
                  mt: 0.5,
                }}
              >
                Newly registered users
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#1E293B" }} />

            {dashboard.recentUsers?.length > 0 ? (
              dashboard.recentUsers.map((user) => (
                <Box
                  key={user._id}
                  sx={{
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,

                    "&:hover": {
                      background: "#172033",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background: "#2563EB20",
                      color: "#60A5FA",
                      fontWeight: 700,
                    }}
                  >
                    {user.username?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      {user.username}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748B",
                        fontSize: 12,
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ px: 3, py: 5 }}>
                <Typography
                  sx={{
                    color: "#64748B",
                    textAlign: "center",
                  }}
                >
                  No users found.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Products */}

        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              mt: 1,
              background: "#111827",
              border: "1px solid #1E293B",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Recent Products
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: 12,
                  mt: 0.5,
                }}
              >
                Recently added products
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#1E293B" }} />

            {dashboard.recentProducts?.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(5, 1fr)",
                  },
                  gap: 2,
                  p: 3,
                }}
              >
                {dashboard.recentProducts.map((product) => (
                  <Box
                    key={product._id}
                    sx={{
                      background: "#0F172A",
                      border: "1px solid #1E293B",
                      borderRadius: 2,
                      p: 1.5,

                      transition: ".2s",

                      "&:hover": {
                        borderColor: "#334155",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={`http://localhost:3000/images/${product.image}`}
                      sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1.5,
                        display: "block",
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 600,
                        mt: 1.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 0.8,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#60A5FA",
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        ₹ {product.price}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#FBBF24",
                          fontSize: 12,
                        }}
                      >
                        ⭐ {product.rating}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ px: 3, py: 5 }}>
                <Typography
                  sx={{
                    color: "#64748B",
                    textAlign: "center",
                  }}
                >
                  No products found.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
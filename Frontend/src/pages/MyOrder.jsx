import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Navbar from "../componrnts/Navbar";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#020617,#0F172A)",
          py: 5,
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              mb: 4,
            }}
          >
            📦 My Orders
          </Typography>

          {orders.length === 0 ? (
            <Card
              sx={{
                background: "#020617",
                border: "1px solid #1E293B",
                color: "#fff",
                p: 5,
                textAlign: "center",
              }}
            >
              <Typography fontSize={24}>No Orders Found 😔</Typography>

              <Typography color="#94A3B8" sx={{mt:2, marginBottom: '40px'}}>
                Looks like you haven't placed any order yet.
              </Typography>
              <Link
                to="/AllProduct"
                variant="contained"
                style={{
                  background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                  borderRadius: "8px",
                  mt: 2,
                  fontWeight: 600,
                  padding: "10px 24px",
                }}
              >
                Continue Shopping
              </Link>
            </Card>
          ) : (
            orders.map((order) => (
              <Card
                key={order._id}
                sx={{
                  mb: 4,
                  background: "#020617",
                  border: "1px solid #1E293B",
                  color: "#fff",
                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px rgba(59,130,246,.25)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={700}>Order ID</Typography>

                      <Typography color="#94A3B8">
                        #{order._id.slice(-8).toUpperCase()}
                      </Typography>

                      <Typography mt={2}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Chip
                      sx={{
                        fontWeight: 700,
                        px: 1,
                        borderRadius: 5,
                      }}
                      label={order.status}
                      color={
                        order.status === "Pending"
                          ? "warning"
                          : order.status === "Shipped"
                            ? "info"
                            : "success"
                      }
                    />
                  </Box>

                  <Divider
                    sx={{
                      my: 3,
                      background: "#475569",
                    }}
                  />

                  {order.products.map((product) => (
                    <Box
                      key={product._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <img
                          src={`http://localhost:3000/images/${product.productId.image}`}
                          width="100"
                          height="100"
                          style={{
                            borderRadius: 12,
                            objectFit: "cover",
                            border: "1px solid #334155",
                          }}
                        />

                        <Box>
                          <Typography fontSize={18} fontWeight={700}>
                            {product.productId.title}
                          </Typography>

                          <Typography color="#94A3B8">
                            Qty : {product.quantity}
                          </Typography>

                          <Typography color="#94A3B8">
                            Price : ₹{product.productId.price}
                          </Typography>
                        </Box>
                      </Box>

                    </Box>
                  ))}

                  <Divider
                    sx={{
                      my: 3,
                      background: "#334155",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography fontWeight={700}>Total Amount</Typography>

                    <Typography
                      sx={{
                        color: "#22C55E",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      ₹ {order.totalAmount}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid #334155",
                      background: "#0F172A",
                    }}
                  >
                    <Typography fontWeight={700} mb={1}>
                      📍 Delivery Address
                    </Typography>

                    <Typography>{order.fullName}</Typography>

                    <Typography>{order.phone}</Typography>

                    <Typography>{order.address}</Typography>

                    <Typography>
                      {order.city}, {order.state}
                    </Typography>

                    <Typography>{order.pincode}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Container>
      </Box>
    </>
  );
}

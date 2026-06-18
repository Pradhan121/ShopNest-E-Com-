import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componrnts/Navbar";
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  // ✅ fetch cart
  const fetchCart = () => {
    axios
      .get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) =>{ 
        console.log("FETCH RESPONSE 👉", res.data.data)
        setCart(res.data.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ update quantity
  const updateQty = (productId, qty) => {
  if (qty < 1) return;

  axios.patch("http://localhost:3000/api/cart",
    {
      productId: productId,
      quantity: qty
    },
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }
  )
  .then((res) => {
     console.log("UPDATE RESPONSE 👉", res.data.data) 
    setCart(res.data.data)
  })
  .catch((err) => console.log(err));
};

// ✅ remove item
const removeItem = (productId) => {
  axios.delete("http://localhost:3000/api/cart", {
    data: {
      productId: productId
    },
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
  .then(() => fetchCart())
  .catch((err) => console.log(err));
};

  // ✅ total price
  const total =
    cart?.items?.reduce(
      (acc, item) =>
        acc + Number(item?.productId?.price || 0) * item.quantity,
      0
    ) || 0;

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617, #0F172A)",
          padding: "40px",
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{ color: "#fff", fontSize: "26px", mb: 3 }}
          >
            My Cart 🛒
          </Typography>

          {cart?.items?.length > 0 ? (
            <>
              {cart.items.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    padding: "14px",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    background: "#020617",
                  }}
                >
                  {/* LEFT */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <img
                      src={`http://localhost:3000/images/${item.productId.image}`}
                      width="80"
                      style={{ borderRadius: "8px" }}
                    />

                    <Box>
                      <Typography
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {item.productId.title}
                      </Typography>

                      <Typography sx={{ color: "#60A5FA" }}>
                        ₹ {item.productId.price}
                      </Typography>

                      {/* Qty Control */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            updateQty(
                              item.productId._id,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </Button>

                        <Typography sx={{ color: "#fff" }}>
                          {item.quantity}
                        </Typography>

                        <Button
                          size="small"
                          onClick={() =>
                            updateQty(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {/* RIGHT */}
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ color: "#fff" }}>
                     ₹ {Number(item?.productId?.price || 0) * item.quantity}
                    </Typography>

                    <IconButton
                      onClick={() =>
                        removeItem(item.productId._id)
                      }
                      sx={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              {/* TOTAL */}
              <Box
                sx={{
                  mt: 4,
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#020617",
                  border: "1px solid #1E293B",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Total: ₹ {total}
                </Typography>

                <Link to='/order'
                  style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: "16px",
                    background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                    color: "#fff",
                    fontWeight: 600,
                    padding: "10px 20px",
                    textDecoration: "none",
                    borderRadius: "6px"
                  }}
                >
                  Proceed to Checkout 🚀
                </Link>
              </Box>
            </>
          ) : (
            // EMPTY UI
            <Box
              sx={{
                textAlign: "center",
                background: "#020617",
                border: "1px solid #1E293B",
                borderRadius: "16px",
                padding: "40px",
              }}
            >
              <Typography sx={{ fontSize: "50px" }}>
                🛒
              </Typography>

              <Typography
                sx={{
                  color: "#E2E8F0",
                  fontSize: "24px",
                  fontWeight: 600,
                  mt: 2,
                }}
              >
                Your Cart is Empty
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  mt: 1,
                  mb: 3,
                }}
              >
                Looks like you haven’t added anything yet
              </Typography>

              <Button
                onClick={() => navigate("/homePage")}
                sx={{
                  background:
                    "linear-gradient(90deg,#2563EB,#3B82F6)",
                  color: "#fff",
                }}
              >
                Continue Shopping 🛍️
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
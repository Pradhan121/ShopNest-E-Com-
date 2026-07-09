import React, { useContext, useEffect, useState } from "react";
import Navbar from "../componrnts/Navbar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { searchBar } = useContext(AuthContext);

  useEffect(() => {
  axios
    .get("http://localhost:3000/api/product")
    .then((res) => {
      setProduct(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get("http://localhost:3000/api/wishlist", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      if (res.data.data) {
        setWishlist(
          res.data.data.products.map((item) => item.productId._id)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const addToCart = (productId) => {
    axios
      .post(
        "http://localhost:3000/api/cart",
        {
          items: [
            {
              productId: productId,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )
      .then(() => {
        toast.success("Cart added successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredProduct = product.filter((p) =>
    p.title.toLowerCase().includes(searchBar.toLowerCase()),
  );

  const addWishlist = (productId) => {
    axios
      .post(
        "http://localhost:3000/api/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )
      .then(() => {
        toast.success("Added to Wishlist ❤️");

        setWishlist((prev) => [...prev, productId]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "60px 0", background: "#020617" }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "#E2E8F0",
              mb: 5,
              letterSpacing: "1px",
            }}
          >
            🔥 All Products
          </Typography>

          <Grid container spacing={4}>
            {filteredProduct.map((item) => (
              <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }} key={item._id}>
                <Card
                  sx={{
                    background: "#020617",
                    border: "1px solid #1E293B",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "0.35s",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                      borderColor: "#3B82F6",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 2,
                    }}
                  >
                    <IconButton
                      onClick={() => addWishlist(item._id)}
                      sx={{
                        background: "#fff",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                    >
                      {wishlist.includes(item._id) ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "red" }} />
                      )}
                    </IconButton>
                  </Box>
                  <Box sx={{ overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={`http://localhost:3000/images/${item.image}`}
                      sx={{
                        height: "250px",
                        objectFit: "cover",
                        transition: "0.4s",

                        "&:hover": {
                          transform: "scale(1.08)",
                        },
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography
                      sx={{
                        color: "#E2E8F0",
                        fontWeight: 600,
                        fontSize: "18px",
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#3B82F6",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        ₹ {item.price}
                      </Typography>

                      <Rating
                        value={Number(item.rating)}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2 }}>
                    <Button
                      onClick={() => addToCart(item._id)}
                      fullWidth
                      sx={{
                        background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                        color: "#fff",
                        fontWeight: 600,
                        borderRadius: "10px",
                        padding: "10px",
                        transition: "0.3s",
                        "&:hover": {
                          background: "linear-gradient(90deg,#1D4ED8,#2563EB)",
                          transform: "scale(1.03)",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import Navbar from "../componrnts/Navbar";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = () => {
    axios
      .get("http://localhost:3000/api/wishlist", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })

      .then((res) => {
        setWishlist(res.data.data?.products || []);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // remove

  const removeWishlist = (productId) => {
    axios
      .delete("http://localhost:3000/api/wishlist", {
        data: {
          productId,
        },

        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })

      .then(() => {
        toast.success("Removed");
        fetchWishlist();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  // add cart

  const addCart = (productId) => {
    axios
      .post(
        "http://localhost:3000/api/cart",

        {
          items: [
            {
              productId,
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
        toast.success("Added To Cart");
      })

      .catch((err) => {
        console.log(err);
      });
  };

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
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: "#fff",
              fontSize: 32,
              fontWeight: 700,
              mb: 4,
            }}
          >
            ❤️ My Wishlist
          </Typography>

          {wishlist.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                color: "#fff",
                mt: 10,
              }}
            >
              <Typography fontSize={28}>No Wishlist Items ❤️</Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {wishlist.map((item) => (
                <Grid item lg={4} md={6} xs={12} key={item._id}>
                  <Card
                    sx={{
                      background: "#020617",
                      border: "1px solid #1E293B",
                      color: "#fff",
                      borderRadius: 4,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={`http://localhost:3000/images/${item.productId.image}`}
                    />

                    <CardContent>
                      <Typography fontWeight={700} fontSize={18}>
                        {item.productId.title}
                      </Typography>

                      <Typography color="#60A5FA" mt={1}>
                        ₹ {item.productId.price}
                      </Typography>

                      <Rating
                        value={item.productId.rating}
                        precision={0.5}
                        readOnly
                        sx={{ mt: 1 }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mt: 3,
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => addCart(item.productId._id)}
                          
                        >
                          Add To Cart
                        </Button>

                        <Button
                          fullWidth
                          color="error"
                          variant="outlined"
                          onClick={() => removeWishlist(item.productId._id)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}

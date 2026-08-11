import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Add_EditProduct from "./Add_EditProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DotLoader from "../../componrnts/DotLoader";

export default function AdminProduct() {
  const filterStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      background: "#0F172A",

      "& fieldset": {
        borderColor: "#334155",
      },

      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563EB",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#94A3B8",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3B82F6",
    },

    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
  };

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    setLoading(true);
    axios
    .get("http://localhost:3000/api/admin/products", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setProducts(res.data.data);
      })
       .catch((err) => {
        console.log(err);
    })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    axios
      .delete(`http://localhost:3000/api/admin/products/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Product Deleted");
        getProducts();
      })
      .catch((err) => {
        console.log(err);
    })
  };

  // const filterProduct = products.filter((item) =>
  //   item.title.toLowerCase().includes(search.toLowerCase()),
  // );

  const filterProduct = [...products]
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (category ? item.category === category : true))
    .filter((item) => (rating ? item.rating >= Number(rating) : true))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Products
        </Typography>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={filterStyle}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth sx={filterStyle}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#0F172A",
                    color: "#fff",

                    "& .MuiMenuItem-root:hover": {
                      bgcolor: "#1E293B",
                    },

                    "& .Mui-selected": {
                      bgcolor: "#2563EB !important",
                    },
                  },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Sportswear">Sportswear</MenuItem>
              <MenuItem value="Consumer Electronics">
                Consumer Electronics
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <FormControl fullWidth sx={filterStyle}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={rating}
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="4">4★ & Above</MenuItem>
              <MenuItem value="4.5">4.5★ & Above</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth sx={filterStyle}>
            <InputLabel>Sort Price</InputLabel>
            <Select
              value={sort}
              label="Sort Price"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="low">Low to High</MenuItem>
              <MenuItem value="high">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          background: "#0F172A",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Image</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>Rating</TableCell>
              <TableCell sx={{ color: "#fff" }}>Category</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <DotLoader label="Loading products" />
                </TableCell>
              </TableRow>
            ) : (
              filterProduct.map((item) => (
                <TableRow key={item._id}>
                <TableCell>
                  <img
                    src={`http://localhost:3000/images/${item.image}`}
                    width="70"
                    height="70"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>

                <TableCell sx={{ color: "#fff" }}>{item.title}</TableCell>

                <TableCell sx={{ color: "#fff" }}>₹ {item.price}</TableCell>

                <TableCell sx={{ color: "#fff" }}>⭐ {item.rating}</TableCell>

                <TableCell sx={{ color: "#fff" }}>{item.category}</TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditData(item);
                      setOpen(true);
                    }}
                  >
                    <EditIcon sx={{ color: "#3B82F6" }} />
                  </IconButton>

                  <IconButton onClick={() => deleteProduct(item._id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Add_EditProduct
        open={open}
        setOpen={setOpen}
        editData={editData}
        fetchProducts={getProducts}
      />
    </>
  );
}

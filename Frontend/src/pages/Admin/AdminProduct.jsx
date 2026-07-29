import {
  Box,
  Button,
  IconButton,
  Paper,
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

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const getProducts = () => {
    axios
      .get("http://localhost:3000/api/product")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    axios
      .delete(`http://localhost:3000/api/product/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Product Deleted");
        getProducts();
      })
      .catch(console.log);
  };

  const filterProduct = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

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

      <TextField
        fullWidth
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          background: "#fff",
          borderRadius: 2,
        }}
      />

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
            {filterProduct.map((item) => (
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
            ))}
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

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Add_EditProduct({
  open,
  setOpen,
  editData,
  fetchProducts,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    rating: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        description: editData.description,
        price: editData.price,
        category: editData.category,
        rating: editData.rating,
        stock: editData.stock,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        rating: "",
        stock: "",
      });

      setImage(null);
    }
  }, [editData, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = () => {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("rating", formData.rating);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    if (editData) {
      API.patch(`http://localhost:3000/api/products/${editData._id}`, data)
        .then(() => {
          toast.success("Product Updated");
          fetchProducts();
          setOpen(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message);
        });
    } else {
      API.post("http://localhost:3000/api/products", data)
        .then(() => {
          toast.success("Product Added");
          fetchProducts();
          setOpen(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {editData ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="outlined"
            component="label"
          >
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={saveProduct}
        >
          {editData ? "Update" : "Save"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}
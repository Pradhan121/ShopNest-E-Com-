import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


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
      axios.patch(`http://localhost:3000/api/admin/products/${editData._id}`, data,{
         headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          toast.success("Product Updated");
          fetchProducts();
          setOpen(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message);
        });
    } else {
      axios.post("http://localhost:3000/api/admin/products", data,{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
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

  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 26,
        }}
      >
        {editData ? "Edit Product" : "Add Product"}
      </DialogTitle>
        <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "black",
              }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
      <DialogContent>
        <Stack spacing={3} mt={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
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
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderStyle: "dashed",
            }}
          >
            {image ? image.name : "Upload Product Image"}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-evenly",
          px: 3,
          pb: 2,
        }}
      >
        <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button variant="contained" onClick={saveProduct}>
          {editData ? "Update Product" : "Save Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

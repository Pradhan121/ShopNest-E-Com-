import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get("http://localhost:3000/api/admin/orders", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(
        `http://localhost:3000/api/admin/orders/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        toast.success("Order Updated");
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography
        sx={{
          color: "#fff",
          fontSize: 30,
          fontWeight: 700,
          mb: 3,
        }}
      >
        Orders
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          background: "#0F172A",
          border: "1px solid #1E293B",
        }}
      >
        <Table>

          <TableHead>

            <TableRow>

              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Customer
              </TableCell>

              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Products
              </TableCell>

              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Total
              </TableCell>

              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Address
              </TableCell>

              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Status
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {orders.map((order) => (

              <TableRow key={order._id}>

                <TableCell sx={{ color: "#fff" }}>
                  <Typography fontWeight={600}>
                    {order.userId?.username}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#94A3B8" }}
                  >
                    {order.userId?.email}
                  </Typography>
                </TableCell>

                <TableCell sx={{ color: "#fff" }}>
                  {order.products.map((item) => (
                    <Box key={item._id}>
                      {item.productId?.title} × {item.quantity}
                    </Box>
                  ))}
                </TableCell>

                <TableCell sx={{ color: "#fff" }}>
                  ₹ {order.totalAmount}
                </TableCell>

                <TableCell sx={{ color: "#fff" }}>
                  {order.address}
                </TableCell>

                <TableCell>

                  <FormControl fullWidth size="small">

                    <Select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">
                        Pending
                      </MenuItem>

                      <MenuItem value="Shipped">
                        Shipped
                      </MenuItem>

                      <MenuItem value="Delivered">
                        Delivered
                      </MenuItem>

                      <MenuItem value="Cancelled">
                        Cancelled
                      </MenuItem>

                    </Select>

                  </FormControl>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}
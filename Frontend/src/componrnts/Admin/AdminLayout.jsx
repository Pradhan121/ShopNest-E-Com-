import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flex: 1 }}>
        <AdminNavbar />

        <Box
          sx={{
            p: 3,
            background: "#020617",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
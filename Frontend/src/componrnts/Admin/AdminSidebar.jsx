import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <InventoryIcon />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ShoppingCartIcon />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <PeopleIcon />,
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  return (
    <Box
      sx={{
        width: 260,
        minHeight: "100vh",
        background: "#0F172A",
        borderRight: "1px solid #1E293B",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          🛍 ShopNest
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 13,
            letterSpacing: 2,
            mt: 0.5,
          }}
        >
          ADMIN PANEL
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#1E293B" }} />

      <List sx={{ mt: 2 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.name}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1.5,
              mb: 1,
              borderRadius: 2,
              color: "#E2E8F0",

              "&.Mui-selected": {
                background: "#2563EB",
              },

              "&.Mui-selected:hover": {
                background: "#2563EB",
              },

              "&:hover": {
                background: "#1E293B",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 35,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

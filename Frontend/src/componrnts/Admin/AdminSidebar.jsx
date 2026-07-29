import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography
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
            path: "/admin/dashboard"
        },
        {
            name: "Products",
            icon: <InventoryIcon />,
            path: "/admin/products"
        },
        {
            name: "Orders",
            icon: <ShoppingCartIcon />,
            path: "/admin/orders"
        },
        {
            name: "Users",
            icon: <PeopleIcon />,
            path: "/admin/users"
        },
        {
            name: "Settings",
            icon: <SettingsIcon />,
            path: "/admin/settings"
        }
    ];

    return (

        <Box
            sx={{
                width: 250,
                background: "#0F172A",
                color: "#fff",
                minHeight: "100vh",
                borderRight: "1px solid #1E293B"
            }}
        >

            <Typography
                sx={{
                    p: 3,
                    fontWeight: 700,
                    fontSize: 25
                }}
            >
                ShopNest Admin
            </Typography>

            <List>

                {
                    menu.map((item) => (

                        <ListItemButton
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}

                            sx={{
                                color: "#fff",

                                "&.Mui-selected": {
                                    background: "#2563EB"
                                },

                                "&:hover": {
                                    background: "#1E293B"
                                }
                            }}
                        >

                            {item.icon}

                            <ListItemText
                                primary={item.name}
                                sx={{ ml: 2 }}
                            />

                        </ListItemButton>

                    ))
                }

            </List>

        </Box>

    );

}
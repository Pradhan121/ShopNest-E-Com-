import { Avatar, Box, Container, Divider, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from '@mui/material'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const {logout,searchBar,setSearchBar} = useContext(AuthContext)

  const handleLogout=()=>{
    logout();
    setAnchorEl(null)
    navigate('/')
  }
  return (
    <>
    <Box sx={{
      background: "#020617",
      borderBottom: "2px solid #1E293B",
      position: 'sticky',
      top: 0,
      zIndex: 999
    }}>
      <Container>
        <Box sx={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           padding: "10px 0px", 
        }}>
          
           <Typography sx={{
              color: '#fff',
              fontSize: '18px', 
              fontWeight: 600,
              letterSpacing: '1.2px'
            }}>ShopNest 🛍️</Typography>  
           <TextField
              size="small"
              placeholder="Search jobs..."
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
              sx={{
                display: { xs: "none", md: "block" },
                background: "#fff",
                borderRadius: "6px",
              }}
            slotProps={{
              input: {
              startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
           }
          }}
        />
           <Box sx={{ display: "flex", gap: 2, alignItems: 'center'}}>
              <ShoppingCartIcon sx={{ color: "#fff" }} />
              <IconButton onClick={openMenu}>
                <Avatar />
              </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          PaperProps={{
            sx: {
              background: "#020617",
              border: "1px solid #1E293B",
              color: "#E5E7EB",
              borderRadius: "10px",
              minWidth: "180px",
            },
          }}
        >
          <MenuItem>My Profile</MenuItem>
          <MenuItem>My Orders</MenuItem>
          <MenuItem>Wishlist</MenuItem>
          <Divider sx={{ borderColor: "#1E293B" }} />
          <MenuItem>Settings</MenuItem>
          <MenuItem sx={{ color: "#ef4444" }} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
        </Box>  
      </Container>
      </Box>
    </>
  )
}

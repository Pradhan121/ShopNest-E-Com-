import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <>
      <Box sx={{
            background: "#020617",
            borderTop: "1px solid #1E293B",
            mt: 8,
            pt: 5,
            pb: 3
          }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
        
            <Grid size= {{md:4, xs: 12}}>
              <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                ShopNest 🛍️
              </Typography>
              <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                  Your one-stop shop for trending products at the best price.
              </Typography>
            </Grid>
      
            <Grid size= {{md:2, xs: 6}}>
              <Typography sx={{ color: "#E2E8F0", fontWeight: 600, mb: 1 }}>
                Shop
              </Typography>
              <Typography sx={{ color: "#94A3B8", cursor: "pointer" }}>All Products</Typography>
              <Typography sx={{ color: "#94A3B8", cursor: "pointer" }}>Cart</Typography>
              <Typography sx={{ color: "#94A3B8", cursor: "pointer" }}>Orders</Typography>
            </Grid>
      
            <Grid size= {{md:3, xs: 6}}>
              <Typography sx={{ color: "#E2E8F0", fontWeight: 600, mb: 1 }}>
                Support
              </Typography>
              <Typography sx={{ color: "#94A3B8" }}>Help Center</Typography>
              <Typography sx={{ color: "#94A3B8" }}>Privacy Policy</Typography>
              <Typography sx={{ color: "#94A3B8" }}>Terms & Conditions</Typography>
            </Grid>
      
            {/* CONTACT */}
            <Grid item xs={12} md={3}>
              <Typography sx={{ color: "#E2E8F0", fontWeight: 600, mb: 1 }}>
                Contact
              </Typography>
              <Typography sx={{ color: "#94A3B8" }}>📧 support@shopnest.com</Typography>
              <Typography sx={{ color: "#94A3B8" }}>📞 +91 8144215057</Typography>
            </Grid>
          </Grid>
      
          {/* BOTTOM */}
          <Box sx={{
            borderTop: "1px solid #1E293B",
            mt: 4,
            pt: 2,
            textAlign: "center"
          }}>
            <Typography sx={{ color: "#64748B", fontSize: "14px" }}>
              © 2026 ShopNest. All rights reserved.
            </Typography>
          </Box>
        </Container>
          </Box>
    </>
  )
}

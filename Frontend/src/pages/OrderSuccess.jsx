import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <>
      <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
            "linear-gradient(135deg,#020617,#0F172A)",
           }}
        >
      <Box textAlign="center">
        <Typography
          sx={{
            fontSize: "70px",
          }}
        >
          ✅
        </Typography>

        <Typography
           sx={{
             color: "#fff",
             fontSize: "28px",
             fontWeight: 700,
             marginBottom: '20px'
           }}
        >
          Order Placed Successfully
        </Typography>
        <Link to='/AllProduct'
                variant='contained'
                style={{
                  background: 'linear-gradient(90deg, #2563EB, #3B82F6)',
                  borderRadius: '8px',
                  mt: 2,
                  fontWeight: 600,
                  padding: '10px 24px',
                }}
              >
                  Continue Shopping
            </Link>
      </Box>
    </Box>
    </>
  )
}

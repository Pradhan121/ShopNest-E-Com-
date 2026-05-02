import React, { useEffect, useState } from 'react'
import Navbar from '../componrnts/Navbar'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Rating, Typography } from '@mui/material'
import axios from 'axios'

export default function HomePage() {
  const[product,setProduct] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/product')
    .then((res)=>{
      setProduct(res.data.data)
    })
    .catch((err)=>{console.log(err)})
  },[])
  return (
    <>
      <Navbar/>

       <Box sx={{
          background: 'linear-gradient(135deg, #020617 0%, #0F172A 50%, #020617 100%)',
          minHeight: '100vh',
          width: '100%',
          padding: '40px 0px',
       }}>
        <Container>
         <Box sx={{
            display: "flex",
            alignItems: "center",
         }}>
          <Grid container spacing={8} sx={{
             display: 'flex',
             alignItems: 'center'
          }}>
             <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <Typography variant='h2' sx={{ color: '#E2E8F0', fontWeight: 700 }}>
                    Discover Your Next Favorite Product
                </Typography>

                <Typography sx={{ color: '#94a3b8', mt: 2, mb: 3 }}>
                  Shop smart, shop fast with our modern store
                </Typography>
                <Button 
                variant='contained'
                sx={{
                  background: 'linear-gradient(90deg, #2563EB, #3B82F6)',
                  borderRadius: '8px',
                  mt: 2,
                  fontWeight: 600,
                  padding: '10px 24px'
                }}
              >
                  Shop Now
            </Button>
            </Grid>
             <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png" alt="" style={{borderRadius: '30%'}}/>
             </Grid>
          </Grid>
         </Box>
         </Container>
       </Box>

      <Box sx={{ padding: "60px 0", background: "#020617" }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
             textAlign: "center",
             fontSize: "32px",
             fontWeight: 700,
             color: "#E2E8F0",
             mb: 5,
             letterSpacing: "1px"
            }}
          >
              🔥 Trending Products
          </Typography>

    <Grid container spacing={4}>
      {product.map((item) => (
        <Grid size={{lg: 4, md: 6, sm: 6, xs: 12}} key={item._id}> 
          <Card
            sx={{
              background: "#020617",
              border: "1px solid #1E293B",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "0.35s",
              position: "relative",
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                borderColor: "#3B82F6",
              },
            }}
          > 
            <Box sx={{ overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={`http://localhost:3000/images/${item.image}`}
                sx={{
                  height: "250px",
                  objectFit: "cover",
                  transition: "0.4s",

                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              />
            </Box>

            
            <CardContent>
              <Typography
                sx={{
                  color: "#E2E8F0",
                  fontWeight: 600,
                  fontSize: "18px",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#3B82F6",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  ₹ {item.price}
                </Typography>

                <Rating
                  value={Number(item.rating)}
                  precision={0.5}
                  readOnly
                />
              </Box>
            </CardContent>

            <CardActions sx={{ p: 2 }}>
              <Button
                fullWidth
                sx={{
                  background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "10px",
                  padding: "10px",
                  transition: "0.3s",
                  "&:hover": {
                    background: "linear-gradient(90deg,#1D4ED8,#2563EB)",
                    transform: "scale(1.03)",
                  },
                }}
              >
                Add to Cart
              </Button>
            </CardActions>

          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
      </Box>

      <Box sx={{
         background: "linear-gradient(90deg,#2563EB,#3B82F6)",
         color: "#fff"
      }}>
         <Container>
             <Typography>🔥 Flat 50% OFF on Electronics</Typography>
         </Container>
      </Box>
    </>
  )
}

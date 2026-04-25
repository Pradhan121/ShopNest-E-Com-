import React from 'react'
import {Box, Button, InputAdornment, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import { useFormik } from 'formik';
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import * as Yup from 'yup';

export default function Register() {
    const[userList,setUserList] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: userList,
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: (values)=>{
            axios.post('http://localhost:3000/api/register',values)
        }
    })
  return (
    <>
       <Box sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #020617 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
       >       
        <Box sx={{
            width: "380px",
            background: "#020617",
            border: "1px solid #1E293B",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
         }}
        >               
          <Typography sx={{
            color: "#E2E8F0",
            fontSize: "26px",
            fontWeight: 700,
            textAlign: "center",
            mb: 3,
           }}
          >
               Create an account 
          </Typography>
           <form action="" onSubmit={formik.handleSubmit}>
              <TextField fullWidth
                label='UserName'
                type='text'
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                sx={{
                   mb: 2,
                  "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "#020617",
                        color: "#fff",
                        "& fieldset": { borderColor: "#334155" },
                        "&:hover fieldset": { borderColor: "#3B82F6" },
                    },
                }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#3B82F6", paddingLeft: "0" }} />             
                </InputAdornment>
              ),
            }}/>
              <TextField fullWidth
                label='Email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                   mb: 2,
                  "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "#020617",
                        color: "#fff",
                        "& fieldset": { borderColor: "#334155" },
                        "&:hover fieldset": { borderColor: "#3B82F6" },
                    },
                }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#3B82F6", paddingLeft: "0" }} />             
                </InputAdornment>
              ),
            }}/>
              <TextField fullWidth
                label='Password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                   mb: 2,
                  "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        background: "#020617",
                        color: "#fff",
                        "& fieldset": { borderColor: "#334155" },
                        "&:hover fieldset": { borderColor: "#3B82F6" },
                    },
                }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <LockIcon sx={{ color: "#3B82F6", paddingLeft: "0" }} />             
                </InputAdornment>
              ),
            }}/>
             <Button
                type="submit"
                style={{
                    width: "100%",
                    background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: "10px",
                    padding: "12px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Register
            </Button>
           </form>
        <Link to='/'
             style={{
              textDecoration:'none',
              color: "#94a3b8",
              textAlign: "center",
              marginTop:'20px',
              fontSize: "18px",
              display:'block'
           }}
         >
          Already have an account?{" "}
          <span style={{ color: "#60A5FA", cursor: "pointer" }}>
            Login
          </span>
        </Link>          
        </Box>      
      </Box>
    </>
  )
}

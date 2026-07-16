import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [searchBar, setSearchBar] = useState('')
  const[cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token && role) {
      setUser({ token, role })  
    }
    getCount();
  }, [])

  const login = (token, role) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    setUser({ token, role })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setUser(null)
  }

  const getCount = () =>{
    const token = localStorage.getItem('token')

    if(!token){
      setCartCount(0)
      return;
    }
  axios.get("http://localhost:3000/api/cart", {headers: {
    Authorization: token,
    },
  })
  .then((res)=>{
     if(res.data.data){
      setCartCount(res.data.data.items.length);
     }
     else{
      setCartCount(0)
     }
  })
  .catch(()=>{setCartCount(0)});
}
  return (
    <AuthContext.Provider value={{ 
        user, login, logout, 
        searchBar, setSearchBar,cartCount, setCartCount,getCount }}>
      {children}
    </AuthContext.Provider>
  )
}
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Cart from './pages/Cart'
import Order from './pages/Order'

function App() {
  return(
    <>
     <ToastContainer position='bottom-right' autoClose= {2000}/>
       <Router>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>} />
              <Route path='/homePage' element={<HomePage/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<Order/>}/>
          </Routes>
       </Router>
    </>
  ) 
}
export default App

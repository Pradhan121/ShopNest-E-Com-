import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  return(
    <>
     <ToastContainer position='bottom-right' autoClose= {2000}/>
       <Router>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>} />
              <Route path='/homePage' element={<HomePage/>}/>
          </Routes>
       </Router>
    </>
  ) 
}
export default App

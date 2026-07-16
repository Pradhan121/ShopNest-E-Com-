import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrder";
import MyProfile from "./pages/myProfile";
import Wishlist from "./pages/Wishlist";
import Settings from "./pages/Setting";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/homePage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllProduct"
            element={
              <ProtectedRoute>
                 <ProductDetail/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/myOrder"
            element={
              <ProtectedRoute>
                  <MyOrders/>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/myProfile"
            element={
               <ProtectedRoute>
                   <MyProfile/>
               </ProtectedRoute>
            }/>
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                    <Wishlist/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                    <Settings/>
                </ProtectedRoute>
              }
            />
        </Routes>
      </Router>
    </>
  );
}
export default App;

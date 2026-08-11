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
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminLayout from "./componrnts/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProduct from "./pages/Admin/AdminProduct";
import Add_EditProduct from "./pages/Admin/Add_EditProduct";
import AdminOrders from "./pages/Admin/AdminOrder";
import AdminProfile from "./pages/Admin/AdminProfile";
import RouteTransitionLoader from "./componrnts/RouteTransitionLoader";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Router>
        <RouteTransitionLoader>
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
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myOrder"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myProfile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />

    <Route path="dashboard" element={<Dashboard />} />

    <Route path="products" element={<AdminProduct />} />

    <Route path="products/add" element={<Add_EditProduct />} />

    <Route path="products/edit/:id" element={<Add_EditProduct />} />

    <Route path="users" element={<AdminUsers />} />

    <Route path="orders" element={<AdminOrders />} />
    <Route path="/admin/profile" element={<AdminProfile />} />
  </Route>
        </Routes>
        </RouteTransitionLoader>
      </Router>
    </>
  );
}
export default App;

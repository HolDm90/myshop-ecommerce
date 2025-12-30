/* import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}
 */


// src/App.jsx
import Navbar from "./components/ui/Navbar";
//import AppRoutes from "./routes/AppRoutes";
import AppRoutes from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </>
  );
}

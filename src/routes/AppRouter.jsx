// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProductDetail from "../pages/ProductDetail";
import UserProfile from "../pages/UserProfile";
import Contact from "../pages/Contact";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- ROUTES PUBLIQUES (Accessibles à tous) --- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productList" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />

      {/* --- ROUTES PROTÉGÉES (Connexion requise) --- */}
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
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
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* --- FALLBACK 404 AMÉLIORÉ --- */}
      <Route 
        path="*" 
        element={
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
            <h1 className="text-6xl font-black text-blue-600">404</h1>
            <p className="text-xl text-gray-500">Oups ! Cette page n'existe pas.</p>
            <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Retour à l'accueil
            </a>
          </div>
        } 
      />
    </Routes>
  );
}

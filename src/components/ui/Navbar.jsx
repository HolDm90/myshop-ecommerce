// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Heart, Store } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../../context/AuthContext"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { user } = useAuth();
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  
  // Calcul du nombre total d'articles (quantités cumulées)
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo & Catalogue */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            <span className="bg-blue-600 text-white p-1 rounded">My</span>Shop
          </Link>
          <Link to="/ProductList" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition">
            <Store className="w-4 h-4" /> Catalogue
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <ThemeSwitcher />

          {/* Favoris */}
          <Link to="/wishlist" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-[10px]">
                {wishlistCount}
              </Badge>
            )}
          </Link>

          {/* Panier */}
          <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors" />
            {totalCartItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-[10px]">
                {totalCartItems}
              </Badge>
            )}
          </Link>

          {/* Séparateur vertical */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          {/* Profil ou Connexion */}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
              <Avatar className="w-9 h-9 border border-gray-200 dark:border-gray-700">
                <AvatarImage src={user.photoURL} alt={user.name || user.email} />
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 font-bold text-xs uppercase">
                  {user.name ? user.name.substring(0, 2) : user.email[0]}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:block text-sm font-semibold truncate max-w-[100px]">
                {user.name || "Compte"}
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <button className="text-sm font-bold bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-2 rounded-full hover:opacity-90 transition">
                Connexion
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// src/components/Navbar.jsx
import { useState } from "react"; 
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Heart, Store, Menu, X, User } from "lucide-react"; 
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../../context/AuthContext"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { user } = useAuth();
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo & Catalogue (Desktop) */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-black italic tracking-tighter flex items-center gap-2">
            <span className="bg-blue-600 text-white p-1 rounded">My</span>Shop
          </Link>
          <Link to="/ProductList" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition">
            <Store className="w-4 h-4" /> Catalogue
          </Link>
        </div>

        {/* Actions (Desktop & Mobile Icons) */}
        <div className="flex items-center gap-2 md:gap-6">
          <ThemeSwitcher />

          {/* Favoris (Visible partout ou masqué sur petit mobile selon choix) */}
          <Link to="/wishlist" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-[10px] border-2 border-white dark:border-gray-900">
                {wishlistCount}
              </Badge>
            )}
          </Link>

          {/* Panier (Toujours visible) */}
          <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors" />
            {totalCartItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-[10px] border-2 border-white dark:border-gray-900">
                {totalCartItems}
              </Badge>
            )}
          </Link>

          {/* Séparateur vertical (Masqué sur mobile) */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

          {/* Profil (Desktop) */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                <Avatar className="w-9 h-9 border border-gray-200 dark:border-gray-700">
                  <AvatarImage src={user.photoURL} alt={user.name || user.email} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs uppercase">
                    {user.name ? user.name.substring(0, 2) : user.email[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm font-semibold truncate max-w-[100px]">
                  {user.name || "Compte"}
                </span>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="rounded-full px-6 font-bold">
                  Connexion
                </Button>
              </Link>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* OVERLAY MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <Link to="/ProductList" onClick={toggleMenu} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">
            <Store className="w-5 h-5 text-blue-600" /> Catalogue Produits
          </Link>
          
          <div className="h-px bg-gray-100 dark:bg-gray-800" />
          
          {user ? (
            <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              Mon Profil ({user.name || user.email})
            </Link>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold">
              <User className="w-5 h-5" /> Se connecter / S'inscrire
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

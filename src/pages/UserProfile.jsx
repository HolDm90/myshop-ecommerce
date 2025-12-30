// src/pages/UserProfile.jsx
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, User, Heart, ShoppingCart, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg font-medium">Vous devez être connecté pour accéder à cette page.</p>
        <Button onClick={() => navigate("/login")}>Se connecter</Button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie ✅");
    // Pas besoin de setTimeout(0), navigate fonctionne très bien après logout
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* SEO NATIF REACT 19 */}
      <title>Mon Profil | MyShop</title>

      {/* HEADER PROFIL */}
      <header className="flex flex-col md:flex-row items-center gap-6 mb-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-xl">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl bg-blue-600 text-white">
            {user.name?.[0] ?? user.email?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight">{user.name ?? "Utilisateur"}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-1">
            <Mail className="w-4 h-4" />
            <p className="text-sm">{user.email}</p>
          </div>
        </div>

        <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" /> Se déconnecter
        </Button>
      </header>

      {/* CONTENU TABS */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 dark:bg-gray-800 p-1">
          <TabsTrigger value="info" className="gap-2">
            <User className="w-4 h-4" /> <span className="hidden sm:inline">Infos</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="gap-2">
            <Heart className="w-4 h-4" /> <span className="hidden sm:inline">Favoris</span> ({wishlist.length})
          </TabsTrigger>
          <TabsTrigger value="cart" className="gap-2">
            <ShoppingCart className="w-4 h-4" /> <span className="hidden sm:inline">Panier</span> ({cart.length})
          </TabsTrigger>
        </TabsList>

        {/* TAB INFO */}
        <TabsContent value="info" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" /> Sécurité & Compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Nom complet</p>
                  <p className="font-medium">{user.name ?? "Non renseigné"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB FAVORIS */}
        <TabsContent value="wishlist" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle>Mes coups de ❤️</CardTitle></CardHeader>
            <CardContent>
              {wishlist.length === 0 ? (
                <p className="text-center py-10 text-gray-500">Aucun produit en favoris pour l'instant.</p>
              ) : (
                <div className="divide-y dark:divide-gray-800">
                  {wishlist.map(item => (
                    <div key={item.id} className="py-3 flex justify-between items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 px-2 rounded-lg transition" onClick={() => navigate(`/products/${item.id}`)}>
                      <span className="font-medium group-hover:text-blue-600">{item.title}</span>
                      <span className="text-blue-600 font-bold">${item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB PANIER */}
        <TabsContent value="cart" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-none shadow-md">
            <CardHeader><CardTitle>Panier actuel 🛒</CardTitle></CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center py-10 text-gray-500">Votre panier est vide.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-xs text-gray-500">Quantité : {item.quantity}</p>
                      </div>
                      <p className="font-black text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Button className="w-full mt-4" onClick={() => navigate("/cart")}>Voir le panier complet</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

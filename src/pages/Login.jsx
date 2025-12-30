// src/pages/Login.jsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn, UserPlus, User } from "lucide-react";

export default function Login() {
  const { login, register: signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

    // 1. On récupère l'URL d'où vient l'utilisateur (envoyée par ProtectedRoute)
  // Sinon, par défaut, on l'envoie vers le catalogue (/productlist)
  const from = location.state?.from?.pathname || "/productlist";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await signUp(email, password, displayName);
        toast.success(`Bienvenue, ${displayName} ! `);
      } else {
        await login(email, password);
        toast.success("Ravi de vous revoir ! ");
      }

      // 2. On utilise la variable "from" pour la redirection
      navigate(from, { replace: true });
      
    } catch (err) {
      // Gestion des erreurs Firebase courantes pour 2025
      const message = err.code === "auth/invalid-credential" 
        ? "Email ou mot de passe incorrect." 
        : err.message;
        
      toast.error("Erreur", { description: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <title>{isRegister ? "Inscription | MyShop" : "Connexion | MyShop"}</title>

      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black italic">
            {isRegister ? "Créer un compte" : "Se connecter"}
          </CardTitle>
          <CardDescription>
            {isRegister ? "Rejoignez la communauté MyShop" : "Accédez à votre espace client"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            
            {/* CHAMP NOM COMPLET (Affiché uniquement à l'inscription) */}
            {isRegister && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required={isRegister}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full h-11 font-bold gap-2" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isRegister ? (
                <><UserPlus className="h-5 w-5" /> S'inscrire</>
              ) : (
                <><LogIn className="h-5 w-5" /> Connexion</>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              {isRegister ? "Déjà inscrit ? Se connecter" : "Nouveau ici ? Créer un compte"}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

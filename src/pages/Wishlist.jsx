// src/pages/Wishlist.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { clearWishlist } from "../store/slices/wishlistSlice";
import ProductCard from "../components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HeartOff, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; 

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);

    const handleClearWishlist = () => {
    dispatch(clearWishlist());
    // Notification de succès (assurez-vous d'avoir installé 'sonner')
    import("sonner").then(({ toast }) => {
      toast.success("Panier vidé", {
        description: "Tous les articles ont été retirés de votre panier.",
        icon: <Trash2 className="h-4 w-4" />,
      });
    });
  };

  // État vide amélioré
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <title>Favoris | MyShop</title>
        <HeartOff className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold">Votre liste est vide</h2>
        <p className="text-gray-500 mb-6">Vous n'avez pas encore ajouté de produits en favoris.</p>
        <Button onClick={() => navigate("/ProductList")}>
          Découvrir nos produits
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen max-w-7xl mx-auto">
      {/* SEO NATIF REACT 19 */}
      <title>Mes Favoris | MyShop</title>
      <meta name="description" content="Retrouvez tous les produits que vous avez aimés." />

      {/* Barre d'outils supérieure */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="mb-2 p-0 h-auto hover:bg-transparent text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Ma Liste de Souhaits <span className="text-blue-600 text-lg">({items.length})</span>
          </h1>
        </div>

         <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 gap-2">
                <Trash2 className="h-4 w-4" /> Vider la favoris
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action va supprimer tous les articles de votre favoris. 
                  Cette opération est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearWishlist} className="bg-red-600 hover:bg-red-700">
                  Oui, vider la favoris
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="animate-in fade-in zoom-in duration-300">
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {/* Footer informatif */}
      <p className="mt-12 text-center text-sm text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-6">
        Les articles ajoutés ici sont sauvegardés pour votre prochaine visite.
      </p>
    </div>
  );
}

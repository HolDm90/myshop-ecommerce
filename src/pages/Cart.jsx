// src/pages/Cart.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from "../store/slices/cartSlice";
import ProductCard from "../components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Trash2, CreditCard } from "lucide-react";
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

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  // Calculs
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10; // Livraison gratuite dès 100$
  const total = subtotal + shipping;

  const handleClearCart = () => {
  dispatch(clearCart());
  // Notification de succès (assurez-vous d'avoir installé 'sonner')
  import("sonner").then(({ toast }) => {
    toast.success("Panier vidé", {
      description: "Tous les articles ont été retirés de votre panier.",
      icon: <Trash2 className="h-4 w-4" />,
    });
  });
};

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <title>Panier | MyShop</title>
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold">Votre panier est vide</h2>
        <p className="text-gray-500 mb-6 text-center">Il semble que vous n'ayez pas encore fait votre choix.</p>
        <Button onClick={() => navigate("/ProductList")}>
          Commencer mes achats
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* SEO NATIF REACT 19 */}
      <title>Mon Panier | MyShop</title>

      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Mon Panier ({items.length})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LISTE DES PRODUITS (2/3 de la page) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="animate-in slide-in-from-left-4 duration-300">
                <ProductCard
                  product={item}
                  showCartControls
                  onIncrease={(p) => dispatch(addToCart(p))}
                  onDecrease={(id) => dispatch(decreaseQuantity(id))}
                  onRemove={(id) => dispatch(removeFromCart(id))}
                />
              </div>
            ))}
          </div>
          
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 gap-2">
                <Trash2 className="h-4 w-4" /> Vider le panier
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action va supprimer tous les articles de votre panier. 
                  Cette opération est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearCart} className="bg-red-600 hover:bg-red-700">
                  Oui, vider le panier
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* RÉSUMÉ DE LA COMMANDE (1/3 de la page) */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Sous-total</span>
                <span>{subtotal.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : shipping.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="pt-4 border-t flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  {total.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}
                </span>
              </div>
            </div>

            <Button className="w-full mt-8 h-12 text-lg gap-2 shadow-lg shadow-blue-200 dark:shadow-none">
              <CreditCard className="h-5 w-5" /> Payer maintenant
            </Button>
            
            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest">
              Paiement sécurisé via Mobile Money & Carte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

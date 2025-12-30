// src/components/ui/ProductCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WishlistButton from "./WishlistButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "../../store/slices/cartSlice";
import { toast } from "sonner";

export default function ProductCard({ product, showCartControls }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handlers avec toast
  const handleIncrease = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} ajouté au panier 🛒`);
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
    toast(`${product.title} diminué du panier ⚠️`);
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    toast.error(`${product.title} retiré du panier ❌`);
  };

  return (
    <Card className="shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardContent>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />

        <h2 className="font-bold mt-2">{product.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
        <p className="text-lg font-semibold mt-2">${product.price}</p>

        {/* Boutons Voir détails + Favoris sur la même ligne */}
        <div className="flex gap-2 mt-2">
          <Button onClick={() => navigate(`/products/${product.id}`)}>
            Voir détails
          </Button>
          <WishlistButton product={product} />
        </div>

        {/* Contrôles du panier */}
        {showCartControls && (
          <div className="flex gap-2 mt-2 items-center">
            <Button size="sm" onClick={handleDecrease}>-</Button>
            <span className="self-center">{product.quantity}</span>
            <Button size="sm" onClick={handleIncrease}>+</Button>
            <Button size="sm" variant="destructive" onClick={handleRemove}>
              Supprimer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

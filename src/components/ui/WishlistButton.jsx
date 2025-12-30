import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isFavorite = wishlist.some((item) => item.id === product.id);

  const handleToggle = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );

    if (isFavorite) {
      toast.error(`${product.title} retiré des favoris 💔`);
    } else {
      toast.success(`${product.title} ajouté aux favoris 💖`);
    }
  };

  return (
    <Button
      variant={isFavorite ? "secondary" : "outline"}
      onClick={handleToggle}
    >
      {isFavorite ? "💖 Retirer" : "🤍 Favoris"}
    </Button>
  );
}

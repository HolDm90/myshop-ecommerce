// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react"; // Ajout de useState pour la galerie
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart, Package, Tag, ShieldCheck } from "lucide-react"; // Icônes
import {
  fetchProductById,
  clearSelectedProduct,
} from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import WishlistButton from "@/components/ui/WishlistButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(""); // Pour gérer la galerie d'images

  const {
    selectedProduct: product,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  // Met à jour l'image principale quand le produit est chargé
  useEffect(() => {
    if (product?.thumbnail) setMainImage(product.thumbnail);
  }, [product]);

  if (status === "loading") {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Skeleton pour le bouton retour */}
      <Skeleton className="h-10 w-24 mb-4" /> 
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Skeleton className="h-[400px] w-full rounded-xl shadow-lg" />
        <div className="space-y-6">
          <div className="flex justify-between">
             <Skeleton className="h-6 w-20" />
             <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-12 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-12 w-32" />
          <div className="grid grid-cols-2 gap-4 py-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-14 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}



  if (status === "failed") return <p className="p-10 text-red-500 text-center">❌ Erreur: {error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-950 min-h-screen">
      {/* SEO NATIF REACT 19 */}
      <title>{`${product.title} | MyShop`}</title>
      <meta name="description" content={product.description} />

      {/* BOUTON RETOUR */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* SECTION IMAGES */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-none shadow-lg">
            <img
              src={mainImage || product.thumbnail}
              alt={product.title}
              className="w-full h-[400px] object-contain bg-gray-50 transition-all duration-300"
            />
          </Card>
          {/* Galerie d'images secondaires (si l'API en fournit) */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition ${
                    mainImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* SECTION INFOS */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="mb-2 uppercase tracking-widest text-[10px]">
                {product.category}
              </Badge>
              <WishlistButton product={product} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-blue-600">
              {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}
            </span>
            {product.discountPercentage && (
              <Badge className="bg-green-500">-{product.discountPercentage}%</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-gray-400" />
              <span>Stock: <b>{product.stock} unités</b></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-gray-400" />
              <span>Marque: <b>{product.brand}</b></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-gray-400" />
              <span>Garantie 2025</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 gap-2 text-lg h-14"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                  })
                );
                toast.success(`${product.title} ajouté au panier 🛒`, {
                  description: "Retrouvez vos articles dans le panier.",
                  position: "bottom-right",
                });
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import WishlistButton from "@/components/ui/WishlistButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Search, ArrowLeft } from "lucide-react"; 

export default function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error, total, page } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [limit] = useState(9);

  // Chargement initial
  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit }));
  }, [dispatch, limit]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ page: 1, limit, query: search }));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchProducts({ page: newPage, limit, query: search }));
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Retour en haut fluide
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* SEO NATIF REACT 19 */}
      <title>Catalogue Produits | MyShop</title>
      <meta name="description" content="Parcourez notre large sélection de produits disponibles au Bénin." />

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold italic">Notre Catalogue</h1>


           {/* BOUTON RETOUR */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors p-0"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour à l'accueil
        </Button>
      </div>
        
        {/* Barre de recherche améliorée */}
        <form onSubmit={handleSearch} className="flex w-full md:w-96 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
            />
          </div>
          <Button type="submit">Rechercher</Button>
        </form>
      </div>

      {/* Gestion des états de chargement et d'erreur */}
      {status === "failed" && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          ❌ Erreur lors du chargement : {error}
        </div>
      )}

      {status === "loading" ? (
        /* SKELETON LOADER SIMULÉ */
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                {/* Zone Image */}
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  {/* Zone Titre */}
                  <Skeleton className="h-6 w-3/4" />
                  {/* Zone Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  {/* Zone Prix & Bouton */}
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Liste des produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.length > 0 ? (
              items.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                         <WishlistButton product={product} />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h2 className="font-bold text-xl line-clamp-1">{product.title}</h2>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">
                        {product.description}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-black text-blue-600">
                          {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-500">Aucun produit trouvé pour "{search}"</p>
              </div>
            )}
          </div>

          {/* Pagination Responsive & Réduite */}
{totalPages > 1 && (
  <div className="flex flex-col items-center mt-12 gap-4">
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Bouton Précédent - Icône seule sur mobile pour gagner de la place */}
      <Button
        variant="ghost"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="px-2 h-9 w-9 sm:w-auto sm:px-4"
      >
        <span className="hidden sm:inline">← Précédent</span>
        <span className="sm:hidden text-lg">‹</span>
      </Button>

      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1;
          
          // LOGIQUE DE RÉDUCTION : 
          // On affiche la 1ère, la dernière, et les pages autour de l'actuelle (rayon de 1)
          const isFirstOrLast = p === 1 || p === totalPages;
          const isNearCurrent = p >= page - 1 && p <= page + 1;

          if (isFirstOrLast || isNearCurrent) {
            return (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(p)}
                className={`h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm ${
                  page === p ? "pointer-events-none" : ""
                }`}
              >
                {p}
              </Button>
            );
          }

          // Ajout des points de suspension (...)
          if (p === page - 2 || p === page + 2) {
            return (
              <span key={p} className="px-1 text-gray-400 text-xs">
                ...
              </span>
            );
          }

          return null;
        })}
      </div>

      {/* Bouton Suivant - Icône seule sur mobile */}
      <Button
        variant="ghost"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="px-2 h-9 w-9 sm:w-auto sm:px-4"
      >
        <span className="hidden sm:inline">Suivant →</span>
        <span className="sm:hidden text-lg">›</span>
      </Button>
    </div>

    {/* Texte informatif discret */}
    <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
      Page {page} sur {totalPages}
    </p>
  </div>
)}

        </>
      )}
    </div>
  );
}

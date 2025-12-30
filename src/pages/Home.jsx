// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import {Skeleton} from "@/components/ui/skeleton"
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { items: products, status } = useSelector((state) => state.products);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* SEO NATIF REACT 19 */}
      <title>Accueil | MyShop Benin 2025</title>
      <meta name="description" content="MyShop : Meilleure boutique en ligne au Bénin. Électronique, Mode et Beauté avec livraison rapide." />
      <link rel="canonical" href={window.location.origin} />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          Bienvenue sur 🛍️ MyShop
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Découvrez les meilleurs produits, aux meilleurs prix, livrés partout au Bénin.
        </p>
        <Link to="/ProductList">
          <Button size="lg" variant="secondary" className="font-bold shadow-lg hover:shadow-xl transition-all">
            Explorer le catalogue →
          </Button>
        </Link>
      </section>

      {/* Catégories */}
<section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
  <h2 className="text-3xl font-bold mb-10 text-center">Explorer par catégories</h2>
  
  {/* On réduit le gap sur mobile (gap-4) et on utilise break-words */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {[
      { name: "Électronique", emoji: "📱" },
      { name: "Mode", emoji: "👗" },
      { name: "Maison", emoji: "🏡" },
      { name: "Beauté", emoji: "💄" },
    ].map((cat) => (
      <div
        key={cat.name}
        className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center min-w-0"
      >
        <span className="text-4xl sm:text-5xl block mb-3">{cat.emoji}</span>
        <p className="font-semibold text-sm sm:text-lg truncate w-full sm:whitespace-normal overflow-hidden px-1">
          {cat.name}
        </p>
      </div>
    ))}
  </div>
</section>


       {/* Produits Populaires */}
      <section className="py-16 px-6 md:px-12 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold">Produits populaires 🔥</h2>
            <Link to="/ProductList" className="text-blue-600 hover:underline font-medium">Voir tout</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {status === "loading" ? (
              // On dessine la structure du skeleton directement ici
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-0 overflow-hidden shadow-sm">
                  <Skeleton className="h-56 w-full rounded-none" /> 
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" /> {/* Titre simulé */}
                    <Skeleton className="h-4 w-full" /> {/* Description simulée */}
                    <div className="flex justify-between items-center pt-4">
                      <Skeleton className="h-8 w-20" /> {/* Prix simulé */}
                      <Skeleton className="h-9 w-24" /> {/* Bouton simulé */}
                    </div>
                  </div>
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.slice(0, 3).map((product) => (
                <div key={product.id} className="group relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 shadow-md">
                    Promo
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 italic">Aucun produit disponible.</p>
            )}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: "🚚", title: "Livraison rapide", desc: "Partout au Bénin (Cotonou, Parakou, Porto-Novo) en 48h." },
            { icon: "🔒", title: "Paiement sécurisé", desc: "Transactions protégées par Mobile Money & Carte Bancaire." },
            { icon: "💖", title: "Service Client", desc: "Une équipe locale à votre écoute 7j/7." },
          ].map((avantage) => (
            <div key={avantage.title} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                {avantage.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{avantage.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{avantage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-white text-3xl font-black italic mb-4">MyShop 🛍️</h2>
              <p className="max-w-sm">La destination numéro 1 pour votre shopping en ligne au Bénin. Qualité garantie et service irréprochable.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link to="/ProductList" className="hover:text-white transition">Catalogue</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Compte</h3>
              <ul className="space-y-2">
                <li><Link to="/profile" className="hover:text-white transition">Mon Profil</Link></li>
                <li><Link to="/cart" className="hover:text-white transition">Mon Panier</Link></li>
                <li><Link to="/wishlist" className="hover:text-white transition">Mes Favoris</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {new Date().getFullYear()} MyShop Benin. Fait avec passion.</p>
            <div className="flex gap-6 text-xs uppercase tracking-widest">
              <span className="cursor-pointer hover:text-white">Conditions</span>
              <span className="cursor-pointer hover:text-white">Confidentialité</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

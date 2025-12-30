// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const products = useSelector((state) => state.products.items);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* SEO NATIF REACT 19 : Ces balises seront automatiquement déplacées dans le <head> */}
      <title>Accueil | MyShop Benin</title>
      <meta name="description" content="Découvrez nos produits de qualité au meilleur prix. Livraison rapide partout au Bénin." />
      <link rel="canonical" href="https://votre-site.com" />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
          Bienvenue sur 🛍️ MyShop
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Découvrez les meilleurs produits, aux meilleurs prix, livrés partout au Bénin.
        </p>
        <Link to="/ProductList">
          <Button size="lg" variant="secondary" className="font-bold">
            Explorer le catalogue →
          </Button>
        </Link>
      </section>

      {/* Catégories */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Explorer par catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Électronique", emoji: "📱" },
            { name: "Mode", emoji: "👗" },
            { name: "Maison", emoji: "🏡" },
            { name: "Beauté", emoji: "💄" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="p-8 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-5xl block mb-3">{cat.emoji}</span>
              <p className="font-semibold text-lg">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Produits Populaires */}
      <section className="py-16 px-6 md:px-12 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Produits populaires 🔥</h2>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="group relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 shadow-md">
                    Promo
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Chargement des produits populaires...</p>
            </div>
          )}
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: "🚚", title: "Livraison rapide", desc: "Partout au Bénin en 48h." },
            { icon: "🔒", title: "Paiement sécurisé", desc: "Transactions protégées par Mobile Money & Card." },
            { icon: "💖", title: "Service Client", desc: "Une équipe à votre écoute 7j/7." },
          ].map((avantage) => (
            <div key={avantage.title} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-3xl mb-4">
                {avantage.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{avantage.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{avantage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-8 mb-8">
            <h2 className="text-white text-2xl font-bold mb-4 md:mb-0">MyShop 🛍️</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/" className="hover:text-white transition">Accueil</Link>
              <Link to="/ProductList" className="hover:text-white transition">Catalogue</Link>
              <Link to="/profile" className="hover:text-white transition">Mon Compte</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} MyShop Benin. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

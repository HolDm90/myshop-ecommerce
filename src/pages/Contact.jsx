// src/pages/Contact.jsx
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Mail, User, MessageSquare } from "lucide-react"; 

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("✅ Message envoyé ! Nous vous répondrons bientôt.");
      reset();
    } catch (err) {
      console.error("Erreur EmailJS :", err);
      toast.error("❌ Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center">
      {/* SEO NATIF REACT 19 */}
      <title>Contactez-nous | MyShop</title>
      <meta name="description" content="Une question ? Une suggestion ? Contactez l'équipe MyShop via notre formulaire." />

      <Card className="w-full max-w-lg shadow-xl border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black italic">Contactez-nous</CardTitle>
          <CardDescription>
            Nous sommes à votre écoute pour toute question.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Champ Nom */}
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className={`pl-10 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Votre nom complet"
                  {...register("name", { required: "Le nom est requis" })}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
            </div>

            {/* Champ Email */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  className={`pl-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="votre@email.com"
                  {...register("email", { 
                    required: "L'email est requis",
                    pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Format d'email invalide" }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
            </div>

            {/* Champ Message */}
            <div className="space-y-1">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  className={`pl-10 pt-2 min-h-[120px] ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="Comment pouvons-nous vous aider ?"
                  {...register("message", { required: "Le message est requis" })}
                />
              </div>
              {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message.message}</p>}
            </div>

            {/* Bouton Envoyer */}
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold gap-2 transition-all active:scale-95" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Envoyer le message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Infos additionnelles */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Ou écrivez-nous directement à : <b>denahouholvanus@gmail.com</b></p>
        <p className="mt-1 italic">Réponse généralement sous 24h.</p>
      </div>
    </div>
  );
}

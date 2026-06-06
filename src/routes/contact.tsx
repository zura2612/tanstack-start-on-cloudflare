// fichier src/routes/contact.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// imports de la logique de traduction
import { usePageTranslations } from "@/hooks/usePageTranslations";
import type { ContactTranslations } from "@/types/translations";

// import des constantes d'environnement
import { siteConfig } from "@/config/site";
import { siteStyle } from "@/config/site";

const borderStyle = "border border-black";
const intituleZoneSaisieStyle = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputBase = `w-full rounded-xl ${borderStyle} px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary`;

// URL de ton Cloudflare Worker (récupérée depuis ton fichier .env)
const workerUrl = import.meta.env.VITE_WORKER_URL; 

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `${siteConfig.entreprise} - Contact` },
      { name: "description", content: siteConfig.headDescriptionContact },
      { name: "robots", content: "index, follow" },
      { name: "canonical", content: siteConfig.urlSite },
      { property: "og:title", content: `${siteConfig.entreprise} — ${siteConfig.headOgTitle}` },
      { property: "og:description", content: siteConfig.headDescriptionContact },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteConfig.urlSite },
      { property: "og:image", content: `${siteConfig.urlSite}/public/vehicule.jpg` },
      { property: "og:site_name", content: siteConfig.entreprise },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang } = useLanguage();
  const [isSending, setIsSending] = useState(false);
  
  // Chargement asynchrone des traductions
  const { data: t, isLoading, error } = usePageTranslations<ContactTranslations>("contact", lang);
  
  if (isLoading) { 
    return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de ContactPage...</p>; 
  }
  
  if (error || !t) { 
    return (
      <p className="text-center py-10 text-destructive" role="alert">
        {error instanceof Error ? error.message : "Impossible de charger les textes."}
      </p>
    ); 
  }
  
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Appel direct à ton Cloudflare Worker natif
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json() as any;

      if (response.ok) {
        toast.success("Demande envoyée ! Nous vous recontactons sous 48h au plus tard.");
        form.reset();
      } else {
        toast.error(result.error || "Erreur lors de l'envoi.");
      }
    } catch (error) {
      toast.error("Erreur réseau. La demande n'a pas pu être envoyée.");
      console.error("Erreur :", error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <main className="w-full">
      <Toaster position="top-right" duration={4000}/>
      
      {/* HERO */}
      {/* Correction de l'espace de la classe pour border border-black */}
      <section className="mb-1 border border-black container-narrow bg-primary text-primary-foreground">
        <div className="container-narrow flex flex-col items-center gap-10 py-5 md:grid-cols-2 md:py-10">
          <h1 className={`${siteStyle.ligne1SectionBleuStyle}`}>{t.hero.primary}</h1>
          <p className={`${siteStyle.ligne2SectionBleuStyle}`}>{t.hero.secondary}</p>
        </div>
      </section>
	  
      {/* FORMULAIRE */}
      <section className="mb-1 container-narrow border border-black">
        <div className="grid">
          <form onSubmit={sendEmail} className={`w-full rounded-2xl ${borderStyle} p-2 shadow-soft md:p-4`}>
            <div className="flex justify-end mb-1">
              <p className="text-xs text-muted-foreground italic" id="required-fields-note">{t.formulaire.champ}</p>
            </div>
            <div className="grid gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3">
              <Field label={t.formulaire.identite} name="prenomNom" required aria-describedby="required-fields-note"/>
              <Field label={t.formulaire.telephone} name="phone" type="tel"/>
              <Field label={t.formulaire.email} name="courriel" type="email" required aria-describedby="required-fields-note"/>
			  
              {/* Saisie du projet via menu déroulant */}
              <div className="col-span-full sm:col-span-1">
                <label className={intituleZoneSaisieStyle}>{t.formulaire.projet}</label>
                <select name="project" className={inputBase} defaultValue={t.projets.defaut}>
                  {t.projets.labels.map((projet, index) => (
                    <option key={index} value={projet.option}>
                      {projet.option}
                    </option>
                  ))}
                </select>
              </div>
			  
              {/* Saisie du message */}
              <div className="col-span-full">
                <label className={intituleZoneSaisieStyle}>{t.formulaire.message}</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  aria-describedby="required-fields-note"
                  className={inputBase}
                  placeholder="Décrivez votre projet, l'adresse, les délais souhaités..."
                />
              </div>
            </div>
			
            {/* Bouton d'envoi dynamique */}
            <button 
              type="submit" 
              disabled={isSending}
              className={`mt-4 ${siteStyle.boutonStyle} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSending ? "Envoi en cours..." : t.formulaire.bouton}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">{t.formulaire.confidentialite}</p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className={intituleZoneSaisieStyle}>{label}</label>
      <input name={name} type={type} required={required} className={inputBase}/>
    </div>
  );
}
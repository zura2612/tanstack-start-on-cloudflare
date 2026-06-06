// fichier src/components/site/CtaBand.tsx
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/LanguageContext";

// imports de la logique de traduction
import { usePageTranslations } from "@/hooks/usePageTranslations";
import type { CtaBandTranslations } from "@/types/translations";

// import des constantes d'environnement
//import {siteConfig} from "@/config/site";
import {siteStyle}  from "@/config/site";

export function CtaBand() {
  const { lang } = useLanguage();
  // Chargement asynchrone typé manuellement
  const { data: t, isLoading, error } = usePageTranslations<CtaBandTranslations>("ctaBand", lang);
  if (isLoading) return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de CtaBand...</p>;
  if (error || !t) return <p className="text-center py-10 text-destructive" role="alert">
  {error instanceof Error ? error.message : "Impossible de charger les textes."}</p>
  
  return (
    /* HERO */
    <section className="mb-1 border border-black container-narrow bg-primary text-primary-foreground">
      <div className="flex flex-col items-center gap-6 py-5 text-center md:py-10">
        <span className={`${siteStyle.titreSectionBleuStyle}`}>{t.hero.title}</span>
        <h2 className={`${siteStyle.ligne1SectionBleuStyle}`}>{t.hero.primary}</h2>
        <p className={`${siteStyle.ligne2SectionBleuStyle}`}>{t.hero.secondary}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className={`${siteStyle.boutonStyle}`}>{t.hero.bouton}</Link>
        </div>
      </div>
    </section>
  );
}

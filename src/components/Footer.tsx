// fichier src/components/site/Footer.tsx
//import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// imports de la logique de traduction
import { usePageTranslations } from "@/hooks/usePageTranslations";
import type { FooterTranslations } from "@/types/translations";

// import des constantes d'environnement
import {siteConfig} from "@/config/site";

const currentYear = new Date().getFullYear();

export function Footer() {
  const { lang } = useLanguage();
  // Chargement asynchrone typé manuellement
  const { data: t, isLoading, error } = usePageTranslations<FooterTranslations>("footer", lang);
  if (isLoading) return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de Footer...</p>;
  if (error || !t) return <p className="text-center py-10 text-destructive" role="alert">
  {error instanceof Error ? error.message : "Impossible de charger les textes."}</p>	
	
  return (
    <footer className="">
	  <section className="container-narrow bg-foreground text-background dark:bg-background dark:text-foreground">
      <div className="border border-black grid py-2 md:grid-cols-4 items-start">
  
      {/* zone Entreprise */}
      <div className="md:col-span-2 flex flex-col">
        <div className="flex items-center gap-2 font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
          <Zap className="h-4 w-4" />
        </span>
        {siteConfig.entreprise}<span className="text-sm font-normal">siret {siteConfig.siret}</span>
        </div>
        <p className="pl-2 max-w-sm text-sm text-background">{t.primary}</p>
        <div className="flex gap-2">
          <a href={`${siteConfig.facebookLink}`} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"><Facebook className="h-4 w-4" /></a>
          <a href={`${siteConfig.instagramLink}`} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"><Instagram className="h-4 w-4" /></a>
          <a href={`${siteConfig.linkedinLink}`} aria-label="Linkedin" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-background/10 hover:bg-accent hover:text-accent-foreground transition-colors"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
     
      {/* zone Contact */}
  {/* L'ajout de pt-2 permet de simuler la hauteur du logo de gauche pour aligner le titre du contact */}
      <div className="md:col-span-2 md:justify-self-end flex flex-col gap-2 pt-2 pr-2">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-background/80">{t.contact}</h4>
        <ul className="flex flex-col gap-3 text-sm text-background/80">
          <li className="flex gap-2 items-center">
            <Mail aria-hidden="true" className="h-4 w-4 text-accent shrink-0" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent hover:underline transition-colors">{siteConfig.email}</a>
          </li>
          <li className="flex gap-2 items-center">
            <MapPin aria-hidden="true" className="h-4 w-4 text-accent shrink-0" />
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.adresse)}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors">{siteConfig.adresse}</a>
          </li>
        </ul>
      </div>

      </div>

      {/* zone références légales */}
	    {/*<div className="border-t border-black mb-3"/>*/}
      <div className="mt-2 border border-black flex flex-col items-center justify-between gap-3 py-2 text-xs text-background/60 md:flex-row">
        <div className="pl-2">© {currentYear} {siteConfig.entreprise} — {t.ref.droits}</div>
        <div className="flex items-center gap-4 pr-2">
          <a href={t.ref.mentionsUrl} className="hover:text-accent" target="_blank" rel="noopener noreferrer">{t.ref.mentions}</a>
          <a href={t.ref.confidentialiteUrl} className="hover:text-accent" target="_blank" rel="noopener noreferrer">{t.ref.confidentialite}</a>
        </div>
      </div>
    </section>
    </footer>
  );
}

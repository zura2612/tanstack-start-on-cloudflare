// fichier src/components/Header.tsx
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Phone, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// imports de la logique de traduction
import { usePageTranslations } from "@/hooks/usePageTranslations";
import type { HeaderTranslations } from "@/types/translations";

// import des constantes d'environnement
import {siteConfig} from "@/config/site";
import {siteStyle}  from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  
  // Chargement asynchrone typé manuellement
  const { data: t, isLoading, error } = usePageTranslations<HeaderTranslations>("header", lang);
  if (isLoading) return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de Header...</p>;
  if (error || !t) return <p className="text-center py-10 text-destructive" role="alert">
  {error instanceof Error ? error.message : "Impossible de charger les textes."}</p>

  
  return (
    <header className="mb-1 sticky top-0 z-100 bg-background/80 backdrop-blur-md">
      <div className="border border-black container-narrow flex h-16 items-center justify-between">

	      {/* logo entreprise */}
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          <span className="text-base">{siteConfig.entreprise}</span>
        </Link>

	     {/* items du menu navigation */}
       <nav className="hidden items-center gap-1 md:flex">
          {t.navigation.labels.map((label) => (
            <Link
              key={label.to}
              to={label.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              activeOptions={{ exact: true }}
              activeProps={{ className: "rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground" }}
            >
              {label.bouton}
            </Link>
          ))}
        </nav>

	     {/* téléphone formulaire de contact langue */}
       <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${siteConfig.phoneLink}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              <Phone className="h-4 w-4" /> {siteConfig.phoneNumber}
          </a>
          <Link
            to={t.navigation.cta.to}
            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
          >{t.navigation.cta.bouton}</Link>
		  
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

       <button
          aria-label="Menu"
          className="md:hidden rounded-full p-2 hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* menu hamburger pour mobile
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            {t.navigation.labels.map((label) => (
              <Link
                key={label.to}
                to={label.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                activeProps={{ className: `${siteStyle.boutonStyle}` }}
              >{label.bouton}</Link>
            ))}
            <a href={`tel:${siteConfig.phoneLink}`} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
              <Phone className="h-4 w-4 text-primary" /> {siteConfig.phoneNumber}
            </a>
            <Link
              to={t.navigation.cta.to}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
            >{t.navigation.cta.bouton}</Link>
			
            <div className="mt-1 flex justify-center"><LanguageSwitcher /></div>
          </div>
        </div>
      )}*/}
      {/* menu hamburger pour mobile */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            
            {/* Liens de navigation mobiles */}
            {t.navigation.labels.map((label) => (
              <Link
                key={label.to}
                to={label.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                activeProps={{ className: `${siteStyle.boutonStyle}` }}
              >
                {label.bouton}
              </Link>
            ))}

            {/* Séparateur visuel discret avant les actions directes */}
            <hr className="my-2 border-muted" />

            {/* 📱 BLOC TÉLÉPHONE + CTA REGROUPÉS VERTICALEMENT */}
            {/*<div className="flex flex-col space-y-2 px-3 py-1">*/}
            {/*<div className="flex flex-col items-start gap-2 px-3 py-1">*/}
            {/*<div className="grid grid-cols-1 gap-2 px-3 py-2 w-full">*/}
            <div className="flex flex-col items-start justify-start gap-2 w-full px-3 py-1 text-left">
            {/* 1. Téléphone */}
            <a href={`tel:${siteConfig.phoneLink}`} className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" /> {siteConfig.phoneNumber}
            </a>
            {/* 2. Bouton Devis (Placé de force immédiatement en dessous) */}
            <Link
            to={t.navigation.cta.to}  onClick={() => setOpen(false)}
            className="border border-black inline-flex rounded-full bg-foreground px-4 py-2 
            text-sm font-semibold text-background transition hover:opacity-90 w-fit"
            >{t.navigation.cta.bouton}</Link>
            </div>

            {/* 3. Actions utilitaires alignées côte à côte (Langue + Thème) */}
            <div className="mt-3 flex items-center gap-4 px-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Langue</span>
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Affichage</span>
                <ThemeToggle />
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  )
}

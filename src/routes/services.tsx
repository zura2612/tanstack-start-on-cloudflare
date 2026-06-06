// fichier src/routes/services.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/CtaBand";
import { BatteryCharging, Home, PlugZap, Wrench, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Imports de la logique de traduction
import { usePageTranslations } from "@/hooks/usePageTranslations";
import type { ServicesTranslations } from "@/types/translations";

// import des constantes d'environnement
import {siteConfig} from "@/config/site";
import {siteStyle}  from "@/config/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
	  { title: `${siteConfig.entreprise} - Services` },
      { name: "description", content: siteConfig.headDescriptionServices },
	  { name: "robots", content: "index, follow" },
      { name: "canonical", content: siteConfig.urlSite },
      { property: "og:title", content: `${siteConfig.entreprise} — ${siteConfig.headOgTitle}` },
      { property: "og:description", content: siteConfig.headDescriptionServices },
	  { property: "og:type", content: "website" },
	  { property: "og:url", content: siteConfig.urlSite },
	  { property: "og:image", content: `${siteConfig.urlSite}/public/vehicule.jpg` },
	  { property: "og:site_name", content: siteConfig.entreprise },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { lang } = useLanguage();
  // Chargement asynchrone typé manuellement
  const { data: t, isLoading, error } = usePageTranslations<ServicesTranslations>("services", lang);
  if (isLoading) return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de ServicesPage...</p>;
  if (error || !t) return <p className="text-center py-10 text-destructive" role="alert">
  {error instanceof Error ? error.message : "Impossible de charger les textes."}</p>;
  
  // Mapping des clés du JSON vers les icônes Lucide
  const servicesIconMap: Record<string, React.ElementType> = {
    Zap: Zap,
    Wrench: Wrench,
    PlugZap: PlugZap,
    Home: Home,
    BatteryCharging: BatteryCharging,
    };
  
  return (
    <main className="w-full">
  	  {/* HERO */}
      <section className="mb-1 container-narrow bg-primary text-primary-foreground">
        <div className="py-10 text-center md:py-20">
          <h1 className={`${siteStyle.ligne1SectionBleuStyle}`}>{t.hero.primary}</h1>
          <p className={`${siteStyle.ligne2SectionBleuStyle}`}>{t.hero.secondary}</p>
        </div>
      </section>
	  
	  {/* SERVICES */}
      <section className="mb-1 container-narrow border border-black py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.cartes.map(({ iconKey, title, text, bouton }) => {
      // Récupère l'icône correspondante depuis le mapping
          const Icon = servicesIconMap[iconKey];
          return (
            <article key={title} className="flex flex-col gap-5 rounded-xl border border-black bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40">
              <div className="">
			    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
                </div>
                <h2 className={`${siteStyle.titreVignetteStyle}`}>{title}</h2>
                <p className={`${siteStyle.ligne1VignetteStyle}`}>{text}</p>
		      </div>
             {/*<Link to="/contact" className={`mt-auto ${siteStyle.boutonStyle}`}>{bouton}</Link>*/}
	         <Link to="/contact" className="mt-auto rounded-xl py-2 px-4 text-sm font-semibold text-center text-accent-foreground bg-accent tracking-wider transition hover:opacity-80">{bouton}</Link>
            </article>
          );
        })}
        </div>
      </section>
     
      <CtaBand />
    </main>
  );
}

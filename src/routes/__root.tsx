// fichier src/routes/__root.tsx
import { HeadContent, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { Footer } from '../components/Footer'
import { Header } from  '../components/Header'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'
import { preloadAllTranslations } from "../hooks/usePageTranslations"

import appCss from '../styles.css?url'

// import des constantes d'environnement
import {siteConfig} from "../config/site";

// Imports de la logique de traduction
import { usePageTranslations } from "../hooks/usePageTranslations";
import type { NotFoundTranslations } from "../types/translations";

//const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

// Appelle preloadAllTranslations au chargement du module
preloadAllTranslations();

function NotFoundComponent() {
  const { lang } = useLanguage();
    // Chargement asynchrone typé manuellement
    const { data: t, isLoading, error } = usePageTranslations<NotFoundTranslations>("__root", lang);
  
    if (isLoading) return <p className="text-center py-10 animate-pulse" aria-live="polite">Chargement du contenu de NotFoundComponent...</p>;
    if (error || !t) return <p className="text-center py-10 text-destructive" role="alert">
    {error instanceof Error ? error.message : "Impossible de charger les textes."}</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-foreground">{t.primary}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.secondary}</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 
          text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90">{t.button}</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: `${siteConfig.entreprise} - Erreur 404` },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: "description", content: siteConfig.headDescriptionRoot },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />*/}
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
     <LanguageProvider>
        <Header />
        {children}
        <Footer />
        <Scripts />
     </LanguageProvider>
      </body>
    </html>
  )
}

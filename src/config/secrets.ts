// src/config/secrets.ts
// Abstraction pour accéder aux secrets : Cloudflare en prod, .env en dev

export interface AppSecrets {
  gmailUser: string;
  gmailAppPassword: string;
  siteName: string;
  corsOrigin: string[];
  port: number;
  nodeEnv: 'development' | 'production';
}

// Helper pour valider qu'un secret est présent
const requireSecret = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Secret requis manquant : ${name}. Vérifiez votre Secrets Manager ou fichier .env`);
  }
  return value;
};

export const getSecrets = (): AppSecrets => {
  const isProd = process.env.NODE_ENV === 'production';
  
  // En prod : lecture depuis l'environnement injecté par Cloudflare / CI
  // En dev : fallback vers process.env (chargé par dotenv)
  const env = isProd ? process.env : { ...process.env };

  return {
    gmailUser: requireSecret('GMAIL_USER', env.GMAIL_USER),
    gmailAppPassword: requireSecret('GMAIL_APP_PASSWORD', env.GMAIL_APP_PASSWORD),
    siteName: env.SITE_NAME || 'www.site.com',
    corsOrigin: (env.CORS_ORIGIN || 'http://localhost:8080,http://localhost:5173')
      .split(',')
      .map((o: string) => o.trim()),
    port: Number(env.PORT_SERVEUR),
    nodeEnv: (env.NODE_ENV as 'development' | 'production') || 'development',
  };
};
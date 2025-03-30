
import React from "react";

const DockerfileSnippet = () => {
  return (
    <pre className="text-green-400 font-mono text-sm">
{`# Dockerfile généré automatiquement pour une application Node.js Express
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers package.json et installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS production

WORKDIR /app

# Copie des fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Configuration des variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposition du port
EXPOSE 3000

# Utilisateur non-root pour la sécurité
USER node

# Lancement de l'application
CMD ["node", "dist/main.js"]`}
    </pre>
  );
};

export default DockerfileSnippet;

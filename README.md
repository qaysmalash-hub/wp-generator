# WP Generator — Mistral AI

Génère des sites WordPress complets (HTML + PHP) en quelques secondes grâce à l'API Mistral AI.

## 🚀 Demo

Déployé sur Vercel : [wp-generator.vercel.app](https://wp-generator.vercel.app)

## ✨ Fonctionnalités

- Génération de sites WordPress (HTML preview + code PHP)
- Choix du type de site : Portfolio, Blog, E-commerce, Landing Page, Restaurant, SaaS...
- Choix du style : Minimaliste, Dark premium, Coloré, Classique, Rétro, Corporate
- 4 modèles Mistral disponibles (Large, Medium, Small, 7B)
- Aperçu live du site généré
- Copie et téléchargement du code

## 🛠 Installation locale

```bash
git clone https://github.com/TON_USERNAME/wp-generator.git
cd wp-generator
# Ouvre simplement index.html dans ton navigateur
open index.html
```

Aucune dépendance, aucun build requis. C'est du HTML/CSS/JS pur.

## 🔑 Clé API Mistral

1. Crée un compte sur [console.mistral.ai](https://console.mistral.ai)
2. Génère une clé API
3. Colle-la dans le champ "Clé API Mistral" de l'interface

> La clé n'est jamais stockée ni envoyée ailleurs que vers l'API Mistral.

## ☁️ Déploiement Vercel

### Option 1 — Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2 — Via GitHub + Vercel (recommandé)
1. Push ce repo sur GitHub
2. Va sur [vercel.com](https://vercel.com) → "New Project"
3. Importe ton repo GitHub
4. Clique sur "Deploy" — c'est tout !

## 📁 Structure

```
wp-generator/
├── index.html      # Application complète (tout-en-un)
├── vercel.json     # Config Vercel (headers de sécurité)
└── README.md
```

## 🔒 Sécurité

- La clé API Mistral est utilisée côté client directement vers l'API Mistral
- Aucun backend, aucune donnée stockée côté serveur
- Pour la production, envisage un proxy backend pour masquer la clé

## 📄 Licence

MIT

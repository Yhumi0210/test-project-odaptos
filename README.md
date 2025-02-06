# smartfridge est une application web de recettes de cuisine

### Front-End

L'utilisateur peut rechercher et filtrer des recettes en fonction de leurs titres, ingrédients ou tags.
Grâce à une interface dynamique, il peut facilement trouver les recettes qui correspondent à ses préférences.

Une fois le repo Github cloné, il faut installer les dépendances et lancer l'application en mode développement.

## Installation

```bash
npm install
# or
yarn
```

## Lancer l'application

```bash
npm run dev
# or
yarn dev
```

## Lancer les tests unitaires et d'intégration

```bash
npm run test
# or
yarn dev
```

L'application front-end est codée en React, TypeScript et SCSS.
Les tests unitaires et d'intégration sont écrits avec Jest.
Outils de développement utilisés : Prettier, ESLint, Vite, Node.js & npm.

Les données sont persistantes en localStorage, elles sont récupérées depuis l'API.


#### L'application est responsive et a les Endpoints suivants :
Mobile: 280px - 375px - 425px<br/>
Tablette: 768px - 1024px - 1280px<br/>
Desktop: 1440px - 1920px
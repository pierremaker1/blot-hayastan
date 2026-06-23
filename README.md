# Բlot Hayastan — apprendre le blot (belote arménienne)

Webapp **100 % hors-ligne** pour apprendre les règles du blot et **jouer contre 3 IA**.
Optimisée téléphone. Aucune connexion requise une fois chargée → parfaite pour l'avion ✈️

## Contenu

- **Jouer** — une vraie table 2 contre 2 (toi + Nord vs Est + Ouest), enchères avec
  indicateur de force de main, IA qui suit les règles, décompte détaillé à chaque donne,
  bouton **💡 Indice** pour apprendre les bons coups.
- **Règles** — tout expliqué en français (valeur des cartes, atout, plis, belote, comptage).
- **Antisèche** — référence rapide : ordre & points, obligations, glossaire.

## L'avoir hors-ligne sur ton téléphone (avant le vol)

Le plus simple, dans l'ordre de préférence :

**Option A — l'héberger (recommandé).** Mets le dossier sur un hébergement statique gratuit
(GitHub Pages, Netlify, Vercel…). Ouvre l'URL **une fois** sur ton téléphone avec du réseau,
puis *Ajouter à l'écran d'accueil*. Le service worker met tout en cache → ça marche ensuite
en mode avion.

**Option B — depuis ton ordi (même Wi-Fi).** Avant de partir, lance le serveur local :

```bash
node server.mjs        # -> http://localhost:8080
```

Trouve l'IP de ton ordi, ouvre `http://<IP-de-l-ordi>:8080` sur le téléphone, *Ajouter à
l'écran d'accueil*. Une fois en cache, l'app fonctionne hors-ligne même sans l'ordi.

**Option C — fichier seul.** `index.html` est autonome (tout est inline). Tu peux te
l'envoyer/AirDropper et l'ouvrir dans un navigateur ; le jeu marche, mais l'installation
PWA « écran d'accueil » nécessite l'option A ou B (http).

## Fichiers

| Fichier                 | Rôle                                             |
|-------------------------|--------------------------------------------------|
| `index.html`            | L'app entière (jeu + règles + UI), autonome      |
| `manifest.webmanifest`  | Métadonnées PWA (installation)                   |
| `sw.js`                 | Service worker (cache hors-ligne)                |
| `icon.svg`              | Icône de l'app                                   |
| `server.mjs`            | Serveur statique local (Node natif, optionnel)   |

## Variante implémentée

Version standard et cohérente du blot : atout choisi par enchère, valeurs atout/hors-atout
classiques, *dix de der*, belote-rebelote, capot. Les annonces (tierce/cinquante/cent/carré),
*sans atout* / *tout atout* et le contre/surcontre sont décrits dans les règles mais pas
inclus dans l'entraîneur. Les règles du blot variant selon les régions.

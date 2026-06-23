/* ===========================================================================
 *  SERVICE WORKER — fait fonctionner l'app SANS réseau (mode avion ✈️)
 *  ---------------------------------------------------------------------------
 *  Stratégie choisie :
 *    - Pages (navigation HTML) : "réseau d'abord". Quand tu as du réseau, on
 *      récupère la DERNIÈRE version (donc les mises à jour s'affichent) ; hors
 *      ligne, on sert la version en cache.  -> jamais bloqué sur une vieille page.
 *    - Autres fichiers (manifest, icône…) : "cache d'abord", c'est rapide et
 *      ça ne change quasiment jamais.
 *  Pour forcer une mise à jour du cache, il suffit d'incrémenter CACHE (v1->v2…).
 * =========================================================================== */
const CACHE = 'blot-hayastan-v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

// À l'installation : on met les fichiers de base en cache.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

// À l'activation : on supprime les anciens caches (versions précédentes).
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Est-ce une demande de PAGE (l'utilisateur ouvre/recharge l'app) ?
  const isPage = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    // Réseau d'abord, repli sur le cache si hors-ligne.
    e.respondWith(
      fetch(req)
        .then(res => { caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {}); return res; })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
  } else {
    // Cache d'abord, sinon réseau (et on met en cache au passage).
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => undefined))
    );
  }
});

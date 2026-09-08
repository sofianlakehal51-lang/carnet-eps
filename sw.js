/* Service worker du Carnet EPS.
   Rôle : rendre l'appli utilisable sans réseau, au fond du gymnase.
   Il ne touche jamais au localStorage : tes données ne passent pas par ici.

   À chaque mise à jour de l'appli, changer VERSION ci-dessous : l'ancien cache
   est alors supprimé et la nouvelle version est téléchargée. */
var VERSION = "carnet-eps-v6";
var COQUILLE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(ev){
  ev.waitUntil(
    caches.open(VERSION).then(function(cache){
      /* addAll échoue en bloc si un seul fichier manque : on tolère les absents. */
      return Promise.all(COQUILLE.map(function(url){
        return cache.add(url).catch(function(){ return null; });
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(ev){
  ev.waitUntil(
    caches.keys().then(function(noms){
      return Promise.all(noms.map(function(n){
        return n === VERSION ? null : caches.delete(n);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(ev){
  var req = ev.request;
  if(req.method !== "GET") return;

  /* Ouverture de l'appli : on tente le réseau d'abord, pour recevoir les mises
     à jour ; hors ligne, on sert la page mise en cache. */
  if(req.mode === "navigate"){
    ev.respondWith(
      fetch(req).then(function(rep){
        var copie = rep.clone();
        caches.open(VERSION).then(function(c){ c.put("./index.html", copie); });
        return rep;
      }).catch(function(){
        return caches.match("./index.html").then(function(r){
          return r || caches.match("./");
        });
      })
    );
    return;
  }

  /* Le reste — icônes, manifeste, polices Google : le cache d'abord,
     c'est instantané et ça marche sans réseau. */
  ev.respondWith(
    caches.match(req).then(function(cache){
      if(cache) return cache;
      return fetch(req).then(function(rep){
        if(rep && (rep.status === 200 || rep.type === "opaque")){
          var copie = rep.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copie); });
        }
        return rep;
      }).catch(function(){ return cache; });
    })
  );
});

# Carnet EPS — mise en ligne sur GitHub Pages

Ce dossier est prêt à être publié tel quel. Il contient :

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli entière. **Ne le modifie pas à la main** : il est fabriqué à partir de `carnet-eps.html` (voir « Mettre à jour » plus bas). |
| `manifest.webmanifest` | Carte d'identité de l'appli : nom, icônes, plein écran. |
| `sw.js` | Le mode hors ligne. C'est lui qui fait la différence entre un lien web et une vraie appli. |
| `icon-180.png` `icon-192.png` `icon-512.png` | Icônes de l'écran d'accueil. |

---

## 1. Créer le dépôt

Sur **github.com**, une fois connectée à ton compte :

1. Bouton **+** en haut à droite → **New repository**.
2. **Repository name** : `carnet-eps`
3. Coche **Public**. *(Pages est gratuit sur les dépôts publics.)*
4. **Create repository**.

> Le dépôt sera public, et c'est sans risque : **aucune donnée réelle n'est écrite dans le code**. Ni élèves, ni collègues, ni projet d'établissement, ni calendrier, ni numéros de téléphone. Tout cela arrive par l'import de ta sauvegarde et reste sur ton téléphone.

## 2. Déposer les fichiers

Sur la page du dépôt vide : **uploading an existing file**.

Fais glisser **le contenu** de ce dossier — les 6 fichiers, pas le dossier lui-même. Puis **Commit changes**.

## 3. Activer Pages

**Settings** → **Pages** (menu de gauche) :

- **Source** : `Deploy from a branch`
- **Branch** : `main`, dossier `/ (root)`
- **Save**

Attends une à deux minutes. L'adresse s'affiche en haut de la page :

```
https://<ton-identifiant>.github.io/carnet-eps/
```

## 4. Installer sur le téléphone

Ouvre cette adresse dans **Chrome** (Android) ou **Safari** (iPhone).

- **Android** : menu ⋮ → *Installer l'application*. Si l'entrée n'apparaît pas, attends 10 secondes et recharge : le service worker doit s'être installé.
- **iPhone** : bouton Partager → *Sur l'écran d'accueil*.

Tu obtiens une icône, une ouverture en plein écran sans barre d'adresse, et **le fonctionnement sans réseau**.

## 5. Récupérer tes données — étape obligatoire

**À l'ouverture, la nouvelle appli est vide.** C'est voulu : aucun nom n'est écrit dans le code. Tes 9 classes existent, mais sans élèves.

1. Sur l'**ancienne** appli (le lien claude.ai) : Réglages → **Exporter mes données**. Tu obtiens `carnet-eps-sauvegarde-AAAA-MM-JJ.json`.
2. Sur la **nouvelle** : Réglages → **Importer une sauvegarde** → choisis ce fichier → confirme.

Tout revient d'un coup : les 114 élèves, la composition des quatre groupes de besoin, les oublis, les notes, les compétences, les dispenses, les cycles et leurs fiches de séance, les rappels de l'année et les documents du collège.

Vérifie que le compte est bon avant d'abandonner l'ancienne appli. **Et garde le fichier de sauvegarde** : c'est désormais le seul endroit où tes listes existent en dehors de ton téléphone.

---

## Mettre à jour l'appli plus tard

La source reste `carnet-eps.html`, dans le dossier parent. Ne modifie jamais `index.html` directement.

1. Dans `Bureau\ENSEIGNEMENT\EPS`, lance : `node construire-pwa.js`
2. Ouvre `carnet-eps-pwa/sw.js` et change la ligne `var VERSION = "carnet-eps-v1";` en `"carnet-eps-v2"`, puis v3, etc. **Sans ça, ton téléphone gardera l'ancienne version en cache.**
3. Redépose `index.html` et `sw.js` sur GitHub (bouton *Add file* → *Upload files*).

---

## Ce que le code ne contient plus

Retiré volontairement, pour qu'un dépôt public ne divulgue rien :

- les **114 élèves** des cinq classes ;
- la **composition des quatre groupes** de besoin ;
- le **projet d'établissement** et les protocoles internes (infirmerie, retards, sorties) ;
- le **calendrier prévisionnel** de l'année ;
- les **noms de collègues**, le numéro du secrétariat, les contacts.

Ce qui reste : les 9 noms de classes, ton emploi du temps hebdomadaire, les quatre intitulés de compétences, et des élèves fictifs pour la démonstration.

Conséquence à connaître : **une installation neuve est vide.** Sans ton fichier de sauvegarde, il n'y a aucun moyen de retrouver les listes. Range-le comme un document de travail — il contient, lui, des données personnelles d'élèves.

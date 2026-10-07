# BOBO Loot

App installable (PC + téléphone) pour gérer les drops, les niveaux de dinos et le mot de passe admin d'un serveur ARK hébergé chez Nitrado.

## Mettre en ligne (gratuit, 5 min)
1. Crée un dépôt sur github.com et envoie tous les fichiers de ce dossier (sauf proxy-worker.js).
2. Settings > Pages > Source : branche `main`, dossier `/root`. Tu obtiens une adresse en https.
3. Ouvre cette adresse :
   - PC (Chrome/Edge) : icône « Installer » dans la barre d'adresse.
   - Android (Chrome) : menu ⋮ > Installer l'application.
   - iPhone (Safari) : Partager > Sur l'écran d'accueil.

## Se connecter
Nitrado ne permet pas aux apps tierces de se connecter avec identifiant + mot de passe. Il faut un **long-life token** :
nitrado.net > ton compte > Développeur > Long-life tokens > scopes `service` et `user_info`.

## Si la connexion est bloquée par le navigateur
Déploie `proxy-worker.js` sur Cloudflare Workers (gratuit), ajoute la variable `PROXY_KEY`,
puis renseigne l'adresse du worker et la clé dans « Options avancées » de l'app.

## Important côté Nitrado
- Active le mode expert dans les réglages du serveur, sinon Nitrado peut réécrire les .ini.
- Utilise « Enregistrer et redémarrer » : l'app arrête le serveur avant d'écrire, sinon ARK écrase GameUserSettings.ini à l'arrêt.

## APK Android
L'APK est compilé automatiquement par GitHub à chaque envoi sur la branche `main` :
1. Envoie tout le dossier sur GitHub (y compris le dossier caché `.github`).
2. Onglet **Actions** > « Construire l'APK » > dernière exécution (environ 5 min).
3. En bas, télécharge **BOBO-Loot-APK** (un zip contenant `app-debug.apk`).
4. Sur le téléphone, ouvre l'APK et autorise l'installation depuis des sources inconnues.

Dans l'APK, les requêtes passent en natif : pas besoin de proxy.

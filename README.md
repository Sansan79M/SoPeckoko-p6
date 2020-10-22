# Piquante #

Voici le MVP du projet 6, du parcours Développeur Web d'OCR.


### Prérequis ###

Au préalable, vous devrez avoir installé localement sur votre ordinateur :
- `Node`, 
- `npm`,
- `Angular CLI`(version 7.0.2 pour ce projet).


### Installation des serveurs ###

1) Téléchargez le code source : dossier SoPeckoko, comportant les deux dossiers backend et frontend.

2) Dans le dossier frontend, dans le terminal : 
- Exécutez `npm install`
- Exécutez `npm start`

3) Dans le dossier backend, dans le terminal :  
- Exécutez `npm install` 

4) Dans le dossier SoPeckoko (hors frontend et backend), dans le terminal :  
- Exécutez `node-sass`


### Installation et connexion de la Base De Données MongoDB Atlas ###

- Créez un compte sur https://www.mongodb.com avec un utilisateur.
- Remplacez `/*'connection link mongodb',*/` dans le fichier `app.js` du backend, à la ligne 13, par votre lien de connexion.


### Fonctionnalités des serveurs ###

1) Dans le dossier backend, dans le terminal : 
- Exécutez `node server.js` ou `nodemon server.js`
- Exécution de l’API backend sur le port `http://localhost:3000`

2) Dans le dossier frontend, dans le terminal : 
- Exécutez `ng serve` pour avoir accès au serveur de développement
- Exécution de l’API frontend sur le port `http://localhost:4200`




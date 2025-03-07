// imp express
const express = require('express');

// crée appli express
const application = express();

// defin le port 
const port = 4000;

// route test application
application.get('/taches', (requete, reponse) => {
    reponse.send('Bienvenido sur l\'API de gestion des tâches');
});

// lire json
application.use(express.json());


// tableau des tâches
const taches = [
    { id: 1, titre: 'Faire les courses', terminee: false },
    { id: 2, titre: 'Apprendre Node.js', terminee: true }
];

// tâches yoryor post
application.post('/taches', (requete, reponse) => {
    const nouvelleTache = {
        id: taches.length + 1,
        titre: requete.body.titre,
        terminee: false
    };

    taches.push(nouvelleTache);
    reponse.status(201).json(nouvelleTache);
});

// Route GET pour récupérer une tâche spécifique par son ID
application.get('/taches/:id', (requete, reponse) => {
    const id = parseInt(requete.params.id); // Conversion de l'ID en nombre
    const tache = taches.find(t => t.id === id);

    if (!tache) {
        return reponse.status(404).json({ message: 'Tâche non trouvée' });
    }

    reponse.status(200).json(taches);
});

// Route PUT pour modifier une tâche existante
application.put('/taches/:id', (requete, reponse) => {
    const tache = taches.find(t => t.id === parseInt(requete.params.id));

    if (!tache) {
        return reponse.status(404).json({ message: 'Tâche non trouvée' });
    }

    tache.titre = requete.body.titre || tache.titre;
    tache.terminee = requete.body.terminee !== undefined ? requete.body.terminee : tache.terminee;

    reponse.status(200).json(taches);
});

// Route DELETE pour supprimer une tâche
application.delete('/taches/:id', (requete, reponse) => {
    const id = parseInt(requete.params.id);
    const index = taches.findIndex(t => t.id === id);

    if (index === -1) {
        return reponse.status(404).json({ message: 'Tâche non trouvée' });
    }

    taches.splice(index, 1);
    reponse.status(200).json({ message: 'Tâche supprimée avec succès' });
});

// liste tâche get
application.get('/taches', (requete, reponse) => {
    reponse.statut(200).json(taches);
})
// go serveur
application.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
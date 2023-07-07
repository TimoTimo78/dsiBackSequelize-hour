// const express = require('express');
// const multer = require('multer');
// const mysql = require('mysql');
// const path = require('chemin');

// // Créer une application Express
// const app = express();

// // Créer une connexion à la base de données MySQL
// const db = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password : 'root',
//  port: 3306,
//  database: 'dsimed',
// });

// // Se connecter à la base de données
// connection.connect((err) => {
//  if (err) throw err;
//  console.log('Connecté à la base de données');
// });

// // Configurer le stockage Multer pour les téléchargements de fichiers
// const storage = multer.diskStorage({
//  destination: 'uploads/',
//  Nom du fichier : (req, fichier, cb) => {
// //  Générer un nom de fichier unique en ajoutant un horodatage au nom de fichier d’origine
//  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//  const extension = path.extname(file.originalname);
//  cb(null, file.fieldname + '-' + uniqueSuffix + extension);
//  }
// });

// // Créer une instance Multer avec la configuration de stockage
// const upload = multer({ storage: storage });

// // Définir un itinéraire pour le téléchargement de fichiers
// app.post('/upload', upload.single('file'), (req, res) => {
// //  Obtenir les détails du fichier téléchargé
//  const file = req.file;

// // Insérer le chemin d’accès au fichier dans la base de données
//  const filePath = file.path;
//  connection.query('INSERT INTO media_files (file_path) VALUES (?)', [filePath], (err, result) => {
//  if (err) {
//  console.error(err);
//  res.status(500).send('Erreur lors de l’insertion d’un fichier dans la base de données');
//  } else {
//  res.send('Fichier téléchargé et inséré dans la base de données');
//  }
//  });
// });

// // Démarrer le serveur
// app.listen(3000, () => {
//  console.log('Serveur démarré sur le port 3000');
// });

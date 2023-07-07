require("rootpath")();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql");
const app = express();
const errorHandler = require("_middleware/error-handler");
const port = 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/users", require("./users/user.controller"));

// global error handler
app.use(errorHandler);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "dsimed",
});

// Se connecter à la base de données
db.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données");
});

// Configurer le stockage Multer pour les téléchargements de fichiers
const storage = multer.diskStorage({
  destination: "uploads/",
  upload: (req, fichier, cb) => {
    //  Générer un nom de fichier unique en ajoutant un horodatage au nom de fichier d’origine
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Créer une instance Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Définir un itinéraire pour le téléchargement de fichiers
app.post("/upload", upload.single("file"), (req, res) => {
  //  Obtenir les détails du fichier téléchargé
  const file = req.file;

  // Insérer le chemin d’accès au fichier dans la base de données
  const filePath = file.path;
  db.query(
    "INSERT INTO media_files (file_path) VALUES (?)",
    [filePath],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Erreur lors de l’insertion d’un fichier dans la base de données"
          );
      } else {
        res.send("Fichier téléchargé et inséré dans la base de données");
      }
    }
  );
});

module.exports = { app, port, db };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../server");
const authenticateToken = require("_middleware/token");


const crypto = require("crypto");

// Génère une clé secrète sécurisée de 128 bits (16 octets)
const generateSecretKey = () => {
  return crypto.randomBytes(16).toString("hex");
};

const secretKey = generateSecretKey();
console.log("Clé secrète :", secretKey);

const path = (app) => {

  // Endpoint pour générer un token d'authentification
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT passwordHash FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          // si l'email n'existe pas dans la base de données
          const message = `L'email n'existe pas`;
          return res.status(401).json({ message });
        } else {
          const dbPassword = results[0].passwordHash;
          bcrypt.compare(password, dbPassword, function (err, result) {
            if (err) {
              const message = `problème de comparaison des mots de passe`;
              return res.status(401).json({ message });
            } else if (result) {
              const token = jwt.sign({ email: email }, "secretKey",{ expiresIn: '2h' 
                 });
              res.json({ token: token });
            } else {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
          });

          // bcrypt.compare(password, results[0]).then((isPasswordValid) => {
          //   // compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données

          //   if (!isPasswordValid) {
          //     // si le mot de passe n'est pas valide
          //     const message = `Le mot de passe est incorrect.\n${password} \n${dbPassword}`;
          //     return res.status(401).json({ message });
          //   }

          //   // Si les informations d'identification sont valides, générez un token
          //   const token = jwt.sign({ email: email }, "secretKey");

          //   // Retournez le token au client
          //   res.json({ token: token });
          // });
        }
      }
    );
    // Vérifiez les informations d'identification de l'utilisateur dans la base de données
    // ...
  });
};

module.exports = path, authenticateToken;

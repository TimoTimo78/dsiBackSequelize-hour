const jwt = require("jsonwebtoken");

function authenticateToken (req, res, next){
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token invalide" });
      }
      // Stockez les informations utilisateur dans la requête pour une utilisation ultérieure
      req.user = user;
      next();
    });
  };

  module.exports = authenticateToken;

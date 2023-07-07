const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const path = (app) => {
  app.get("/medias", authenticateToken, (req, res) => {
    const q = "SELECT * FROM medias";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  app.post("/medias", authenticateToken, (req, res) => {
    const reference_media = req.body.reference_media;
    const url = req.body.url;
    if (!reference_media) {
      res.status(400).json({ error: "La reference du média est obligatoire" });
      return;
    }
    if (!url) {
      res.status(400).json({ error: "L'url du média est obligatoire" });
      return;
    }
    db.query(
      "INSERT INTO medias(reference_media, url) VALUES(?, ?)",
      [reference_media, url],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Média créé avec succès" });
        }
      }
    );
  });
  app.put("/medias/:id", authenticateToken, (req, res) => {
    const { reference_media, url } = req.body;
    const id_medias = req.params.id;
    db.query(
      "UPDATE medias SET reference_media = ?, url = ? WHERE id_medias = ?",
      [reference_media, url, id_medias],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Media modifié avec succès" });
        }
      }
    );
  });
  app.patch("/medias/:id/:value", authenticateToken, (req, res) => {
    const id_medias = req.params.id;
    let value = {};
    if (req.params.value === "reference_media") {
      value = req.body.reference_media;
      reqSql = "UPDATE medias SET reference_media = ? WHERE id_medias = ?";
    } else if (req.params.value === "url") {
      value = req.body.url;
      reqSql = "UPDATE medias SET url = ? WHERE id_medias = ?";
    } else {
      console.error("error");
    }
    db.query(reqSql, [value, id_medias], (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Média modifié avec succès" });
      }
    });
  });
  app.delete("/medias/:id", authenticateToken, (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM medias WHERE id_medias = ?", [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("Média non trouvé");
      } else {
        res.status(200).json({ message: "Média supprimé avec succès" });
      }
    });
  });
};

module.exports = path;

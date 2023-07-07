const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const path = (app) => {
  app.get("/articles", authenticateToken, (req, res) => {
    const q = "SELECT * FROM articles";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  app.post("/articles", authenticateToken, (req, res) => {
    const titre = req.body.titre;
    const content = req.body.content;
    const date_publication = req.body.date_publication;
    const id_users = req.body.id_users;
    const id_medias = req.body.id_medias;
    if (!titre) {
      res.status(400).json({ error: "Le titre de l'article est obligatoire" });
      return;
    }
    if (!content) {
      res
        .status(400)
        .json({ error: "Le contenu de l'article est obligatoire" });
      return;
    }
    if (!date_publication) {
      res
        .status(400)
        .json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }
    if (!id_users) {
      res
        .status(400)
        .json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }
    if (!id_medias) {
      res
        .status(400)
        .json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }
    db.query(
      "INSERT INTO articles(titre, content, date_publication, id_users, id_medias) VALUES(?, ?, ?, ?, ?)",
      [titre, content, date_publication, id_users, id_medias],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Articles créé avec succès" });
        }
      }
    );
  });
  app.put("/articles/:id", authenticateToken, (req, res) => {
    const { titre, content, date_publication, id_users, id_medias } = req.body;
    const id_articles = req.params.id;
    db.query(
      "UPDATE articles SET titre = ?, content = ?, date_publication = ?, id_users = ?, id_medias = ?  WHERE id_articles = ?",
      [titre, content, date_publication, id_users, id_medias, id_articles],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Article modifié avec succès" });
        }
      }
    );
  });
  app.patch("/articles/:id/:value", authenticateToken, (req, res) => {
    const id_articles = req.params.id;
    let value = {};
    if (req.params.value === "titre") {
      value = req.body.titre;
      reqSql = "UPDATE articles SET titre = ? WHERE id_articles = ?";
    } else if (req.params.value === "content") {
      value = req.body.content;
      reqSql = "UPDATE articles SET content = ? WHERE id_articles = ?";
    } else if (req.params.value === "date_publication") {
      value = req.body.date_publication;
      reqSql = "UPDATE articles SET date_publication = ? WHERE id_articles = ?";
    } else if (req.params.value === "id_users") {
      value = req.body.id_users;
      reqSql = "UPDATE articles SET id_users = ? WHERE id_articles = ?";
    } else if (req.params.value === "id_medias") {
      value = req.body.id_medias;
      reqSql = "UPDATE articles SET id_medias = ? WHERE id_articles = ?";
    } else {
      console.error("error");
    }
    db.query(reqSql, [value, id_articles], (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Articles modifié avec succès" });
      }
    });
  });
  app.delete("/articles/:id", authenticateToken, (req, res) => {
    const id = req.params.id;
    db.query(
      "DELETE FROM articles WHERE id_articles = ?",
      [id],
      (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).send("Articles non trouvé");
        } else {
          res.status(200).json({ message: "Articles supprimé avec succès" });
        }
      }
    );
  });
};

module.exports = path;

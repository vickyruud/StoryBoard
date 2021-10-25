const express = require("express");
const router = express.Router();
const database = require("../database");

module.exports = (db) => {
  //renders the newstory page
  let templateVars = {};
  router.get("/", (req, res) => {
    const user = req.session.user;
    templateVars = { user: user };
    res.render("newstory", templateVars);
  });
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    database
      .insertNewStory({ ...req.body, author_id: userId })
      .then((newStory) => {
        res.send(newStory);
      })
      .catch((e) => res.send(e));
  });

  return router;
};

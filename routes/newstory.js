const express = require("express");
const router = express.Router();
const database = require("../database");

module.exports = (db) => {
  //renders the newstory page
  let templateVars = {};
  router.get("/", (req, res) => {
    const user = req.session.userId;
    templateVars = { user: user };
    res.render("newstory", templateVars);
  });
  router.post("/", (req, res) => {
    const userId = req.session.userId;
    console.log(userId);
    database
      .insertNewStory({ ...req.body, author_id: userId.id })
      .then((newStory) => {
        res.redirect('/');
      })
      .catch((e) => res.send(e));
  });

  return router;
};

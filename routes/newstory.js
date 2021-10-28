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
    if (req.body.contents === "" || req.body.title === "") {
      
      return res.redirect('back');
    }
    const userId = req.session.userId;
    database
      .insertNewStory({ ...req.body, author_id: userId.id })
      .then((newStory) => {
        res.redirect('/myStories');
      })
      .catch((e) => res.send(e));
  });
  return router;
};

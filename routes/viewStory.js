/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../database');


module.exports = (db) => {
  

  router.get("/:id", (req, res) => {
    const storyId = req.params.id;
    const user = req.session.userId;
    return database.getStoryAndContributions(storyId)
    .then(story => {
      const templateVars = {story, user};
      res.render('storyView', templateVars);
      })
      .catch((error) => {
        console.log(error.message);
        res
          .status(500)
          .json({ error: error.message });
      })
   
  });
 


  return router;

};

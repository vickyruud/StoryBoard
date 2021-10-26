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
<<<<<<< HEAD
      const templateVars = {story, user};
      res.render('storyView', templateVars);
=======
      console.log("This is our story---",story);
        const templateVars = {story, user};
        res.render('storyView', templateVars)
>>>>>>> 28a1d0f1971d88c9e8f296acf12540bd8f4c0ab0
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

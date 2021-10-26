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
    console.log(storyId);
    const user = req.session.userId;
    return database.getStory(storyId)
    .then(story => {
<<<<<<< HEAD
      
      const templateVars = {story, user};
        res.render('storyView', templateVars);
=======
      console.log("This is our story---",story);
        const templateVars = {story, user};
        res.render('storyView', templateVars)
>>>>>>> 3366dd4d340fcfabd2f478b92bc1207f4b872d86
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

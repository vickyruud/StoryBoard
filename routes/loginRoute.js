/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../database');

module.exports = (db) => {

  //renders the login page
  router.get("/", (req, res) => {
   res.render('login');
  });

  //fetches the user from the database based on the email
  const login = function (email, password) {
    return database.getUserWithEmail(email).then((user) => {
      if (email === user.email && password === user.password) {
        return user;
      } else {
        return null
      }

    });
  };
  exports.login = login;
  let templateVars = {};

  //the post function calls the login function above and checks if user exists
  // if the user exists then it renders the page else gives error
  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email, password).then(user => {
      if (user) {
        req.session.userId = user.name;
        db.query (`
          SELECT title, users.name as author, status, LEFT(contents,100) as contents
          FROM stories
          JOIN users ON users.id = stories.author_id;
        `)
        .then((result) => {
          const templateVars = {user : user, stories: result.rows};
          console.log('connection started');
          res.render("index", templateVars);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        })
      } else {
        res.send("Incorrect username/password");
      }
    })
    .catch(e => res.send(e));
  });

  return router;
};

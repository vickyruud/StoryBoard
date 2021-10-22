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

  //retrieves user with email address from database
  const login = function (email, password) {
    return database.getUserWithEmail(email).then((user) => {   
      if (email === user.email && user.password === password) {
        return user;
      } else {
        return null
      }
      
    });
  };
  exports.login = login;

  //logs the user in and sets the cookies
  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email, password).then(user => {
      if (!user) {
        res.send('Incorrect email/password');
        return;
      } else {
          req.session.userId = user.id;
          const templateVars= {user: user};
          res.render("index",templateVars);
      }

    })
    .catch(e => res.send('Incorrect email/password'));
  });

  return router;
};

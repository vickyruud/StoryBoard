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
  router.get("/", (req, res) => {
   res.render('login');
  });

  const login = function (email) {
    database.getUserWithEmail(email).then((user) => {      
      return user;
    });
  };

  router.post('/', (req, res) => {
    const user = login(req.body.email)
    if (user) {
      req.session.user_Id = user.id;
      const templateVars={user:user};
      console.log( 'from login route:', templateVars);
      res.render("index",templateVars);
    } else {
      res.statusCode = 400;
      res.send("Incorrect username/password");
    }
    res.render("login");
  });

  exports.login = login;
  return router;
};

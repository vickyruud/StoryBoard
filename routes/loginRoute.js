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

  const login = function (email, password) {
    return database.getUserWithEmail(email).then((user) => {   
      if (user.password === password) {
        return user;
      }
      return null;
    });
  };

  router.post('/', (req, res) => {
    const user = login(req.body.email, req.body.password)
    console.log(`from route post:`, req.body.email);
    if (user) {
      console.log('this is from the if statement',user)
      req.session.userId = user.id;
      const templateVars= {user: user};
      res.render("index",templateVars);
    } else {
      alert("Incorrect username/password");
      res.render("login");
    }
  });

  exports.login = login;
  return router;
};

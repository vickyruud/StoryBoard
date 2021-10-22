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
      if (email === user.email && user.password === password) {
        return user;
      } else {
        return null
      }
      
    });
  };
  exports.login = login;
  let templateVars = {};

  //if the user exists it lets them login
  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email, password).then(user => {
      if (user) {
        req.session.user_id = user.id;
        templateVars = {user: user};
        res.render('index', templateVars);
        } else {
        res.send("Incorrect username/password"); 
      }

    })
    .catch(e => res.send(e));
  });

  return router;
};

/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
/*
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT title, users.name as author, status, LEFT(contents,100) as contents
    FROM stories
    JOIN users ON users.id = stories.author_id;
    `;
    console.log(query);
    db.query(query)
      .then(data => {
        const stories = data.rows;
        let user = undefined;
        if (req.session.userId) {
          user = req.session.userId;
        }
        const templateVars = {user, stories};
        console.log('story list loaded');
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
*/

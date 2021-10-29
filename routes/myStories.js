/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = `
    SELECT title, users.name as author, stories.status,
    LEFT(contents,100) as contents, stories.id,
    count(contributions.id) as contributions_count
    FROM stories
    JOIN users ON users.id = stories.author_id
    LEFT JOIN contributions ON stories.id = contributions.story_id
    WHERE users.name = $1
    GROUP BY stories.id, users.id
    ORDER BY stories.status, stories.created_on;
    `;
    const user = req.session.userId;
    const view = 'myStories'
    db.query(query, [user.name])
      .then(data => {
        const stories = data.rows;
        const templateVars = {user, stories, view};
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

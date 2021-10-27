const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const query = `
      DELETE FROM stories
      WHERE stories.id = $1;
      `;
    const storyId = req.params.id;
    db.query(query, [storyId])
      .then(() => {
        console.log(`story ${storyId} deleted`);
        res.redirect("back");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

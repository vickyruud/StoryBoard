const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});
// Users
/**
 * Get a single user from the database given their email.
 */

const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT * FROM users
    WHERE users.email = $1;`,
      [email]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const insertNewStory = function (
  story
) {
  const queryString = `INSERT INTO stories(title,contents,created_on,author_id) VALUES($1, $2, $3, $4)  returning *`;
  const created_on = new Date();
  console.log(created_on);
  const values = [story.title,
    story.contents,
    created_on,
    story.author_id];
  return pool
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getUserWithEmail = getUserWithEmail;
exports.insertNewStory = insertNewStory;

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
// Users
/**
 * Get a single user from the database given their email.
 */

 const getUserWithEmail = function(email) {
  return pool.query(
    `SELECT * FROM users
    WHERE users.email = $1;`, [email])
    .then(res => {
      console.log(`from database.js: `, res.rows[0]);
      return res.rows[0];
    });
};
exports.getUserWithEmail = getUserWithEmail;

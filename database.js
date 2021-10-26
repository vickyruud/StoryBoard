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
  
exports.getUserWithEmail = getUserWithEmail;




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
exports.insertNewStory = insertNewStory;

const getStoryAndContributions = function (storyId, user) {
  const queryString = `SELECT stories.title, stories.author_id, users.name, stories.status, stories.contents,
  contributions.id as contribution_id, contributions.contribution_text as contribution_text,
  contributions.status as contribution_status,
  contributions.created_on as contributions_date,
  contributions.votes as contributions_votes,
  contributions.contributor_id as contributor_id, contributions.story_id as contributions_story_id  
  FROM stories
  JOIN users ON users.id = stories.author_id
  LEFT JOIN contributions ON stories.id = contributions.story_id
  WHERE stories.id = $1;`
  return pool.query (queryString, [storyId])
    .then(res => {
      return res.rows;    
    });
}

exports.getStoryAndContributions = getStoryAndContributions;

const getContributions = function (storyId) {
  const queryString = `SELECT * FROM contributions WHERE contributions.story_id = $1`
  return pool.query(queryString, [storyId])
    .then(res => console.log(res.rows));
}

exports.getContributions = getContributions;

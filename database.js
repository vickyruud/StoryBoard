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

const addContribution = function (contribution, contributorId, storyId) {
  const queryString = `INSERT INTO contributions (contribution_text, contributor_id, story_id, created_on)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  const created_on = new Date();
  const queryParams = [contribution, contributorId, storyId, created_on];
  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch((err) => console.log(err.message));
}

exports.addContribution = addContribution;

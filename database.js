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
  const queryString = `SELECT stories.id, stories.title, stories.author_id, users.name, stories.status, stories.contents,
  contributions.id as contribution_id, contributions.contribution_text as contribution_text,
  contributions.status as contribution_status,
  contributions.created_on as contributions_date,
  contributions.votes as contributions_votes,
  contributions.contributor_id as contributor_id, contributions.story_id as contributions_story_id
  FROM stories
  JOIN users ON users.id = stories.author_id
  LEFT JOIN contributions ON stories.id = contributions.story_id
  WHERE stories.id = $1;`;
  return pool.query(queryString, [storyId])
    .then(res => {
      return res.rows;
    });
}

exports.getStoryAndContributions = getStoryAndContributions;

const getContributorName = function (contributorId) {
  const queryString = `SELECT users.name FROM users 
  JOIN contributions ON contributions.contributor_id = users.id
  WHERE contributions.contributor_id = $1 LIMIT 1;`

  return pool.query(queryString, [contributorId])
    .then(res => {
      return res.rows;
    })
    .catch((e) => console.log(e.message));
}

exports.getContributorName = getContributorName

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

const markStoryComplete = function (storyId) {
  const queryString = `UPDATE stories SET status = 'Completed' WHERE stories.id = $1;`
  return pool.query(queryString, [storyId])
    .then(res => res.rows)
    .catch((err) => console.log(err.message));

}

exports.markStoryComplete = markStoryComplete;

const findContributionText = function (contributionId) {
  const queryString = `SELECT contribution_text, status 
  FROM contributions
  WHERE id = $1;`
  return pool.query(queryString, [contributionId])
    .then(res => res.rows[0]);
}

exports.findContributionText = findContributionText;

const acceptContribution = function (text, storyId , status) {
  queryString = `UPDATE stories
  SET contents = contents || '_' || $1
  WHERE id = $2;`

  return pool.query(queryString, [text, storyId])
    .then(res => res.rows);

}

exports.acceptContribution = acceptContribution;

const updateContributionStatus = function (contributionId) {
  const queryString = `UPDATE contributions
  SET status = 'Accepted'
  WHERE id = $1;`

  return pool.query(queryString, [contributionId])
    .then(res => res.rows);
}

exports.updateContributionStatus = updateContributionStatus;

const rejectContribution = function (contributorId) {

  const queryString = `UPDATE contributions
  SET status = 'Rejected'
  WHERE id = $1;`

  return pool.query(queryString, [contributionId])
    .then(res => res.rows);

}
exports.rejectContribution = rejectContribution;


const upVote = function (contributionId) {
  const queryString = `UPDATE contributions SET votes = votes + 1 WHERE id =$1;`
  return pool.query(queryString, [contributionId])
    .then (res => res.rows)
    .catch((err) => console.log(err.message));
}

exports.upVote = upVote;
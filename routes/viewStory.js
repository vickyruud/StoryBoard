/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../database');


module.exports = (db) => {


  //gets the story and all it's contributions and renders the page

  router.get("/:id", (req, res) => {
    const storyId = req.params.id;
    const user = req.session.userId;
    req.session.story = storyId;

    return database.getStory(storyId)
    .then(story => {
        database.getContributions(storyId)
          .then(contributions => {
            const templateVars = {story, user, contributions};
            res.render('storyView', templateVars);
            
          })      
    })
      .catch((error) => {
        console.log(error.message);
        res
          .status(500)
          .json({ error: error.message });
      })

  });

  //submits a contribution

  router.post("/:id", (req,res) => {
    const user = req.session.userId;
    const contributionText = req.body.yourContribution;
    const contributorId = user.id
    const storyId = req.session.story;
    database.getStory(storyId)
      .then(story => {
        database.getContributions(storyId)
          .then(response => {
            database.addContribution(contributionText, contributorId, storyId)
            .then(result => {
              res.redirect('back');
            })

          })
          .catch((e) => console.log(e.message));
      })
      .catch((e) => console.log(e.message));

  });

  router.post('/:id/edit', (req,res) => {
    const storyId = req.session.story;
    database.markStoryComplete(storyId)
      .then(result => {
        res.redirect('back');

      })
  })

  router.post('/:id/upvote', (req,res) => {
    contributionId = req.params.id;
    database.upVote(contributionId)
      .then(result => 
        res.redirect('back'))
      .catch((e) => console.log(e.message));  
    
  })

  router.post('/:id/:id/accept', (req,res) => {
    contributionId = req.params.id;
    storyId = req.session.story
    database.findContributionText(contributionId)
      .then(contribution =>{
        const text = contribution.contribution_text;
        const status = contribution.status
        database.acceptContribution(text, storyId, status)
          .then(result => 
            database.updateContributionStatus(contributionId)
              .then(
                res.redirect('back')))
      }) 
    
  })
  
  router.post('/:id/:id/reject', (req, res) => {
    contributionId = req.params.id;
    database.rejectContribution(contributionId)
      .then(res.redirect('back'));
  })

  return router;

};

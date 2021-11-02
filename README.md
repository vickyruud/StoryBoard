StoryBoard - The Power of Collaborative Imagination
=========
Where users can collaborate to weave a dream tale out of the threads of their imagination. There is no limit to creativity and the power of writing collaboratively is amazing!

## Getting Started

1. Install dependencies: `npm i`
2. Run the server: `npm run local`
3. Run the database reset: `npm run db:reset`
4. Visit `http://localhost:8080/`

### Screenshots

!["Screenshot of Homepage"](https://github.com/vickyruud/StoryBoard/blob/master/images/homepage.png)

!["Screenshot of New Story page"](https://github.com/vickyruud/StoryBoard/blob/master/images/newstory.png)

!["Screenshot of View Story page"](https://github.com/vickyruud/StoryBoard/blob/master/images/viewstory.png)

### Functionality


- Authorized users can start a story
- An authorized user can start a new story by clicking 'Create New Story' . 
- A user must enter the Title and Story contents in the box.
- A user can submit the new story by clicking the submit button once contents are added. The submitted story could be viewed on the story page where you can contribute further to it. The story would be listed on My stories page.
- Users can view a list of stories on the homepage along with their status e.g. in progress or completed-
- Users can read a story
- A user can read a story by clicking the View button that leads to the story page without login.
- A user can see the contributions made to the story. If the user needs to contribute they need to login.
- Once a user is logged in, see their name on the home page.
- A user can view a story written by other authors and contribute to a story with status- In progress
- Users can add contributions to an existing story
- A user can add 'Edit their own story if it is not 'Marked Complete'. A user can add contributions to other stories
- Users can upvote a contribution
- Users can see upvotes of a contribution
- Creator of story can accept a contribution; this merges it to the rest of the story
- Creator of a story can mark the story completed
- Users cannot add to a completed story



## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

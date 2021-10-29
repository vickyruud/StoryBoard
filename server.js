// load .env data into process.env
require("dotenv").config(); // to check with Mahsa on Monday about dotenv or .env
//calls the database file
const database = require("./database");
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
const cookieSession = require("cookie-session");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const loginRoute = require("./routes/loginRoute");
const logout = require("./routes/logout");
const newstoryRoute = require("./routes/newstory");
const myStories = require("./routes/myStories");
const viewStory = require("./routes/viewStory");
const deleteStory = require("./routes/deleteStory");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", loginRoute(db));
app.use("/logout", logout(db));
app.use("/newstory", newstoryRoute(db));
app.use("/mystories", myStories(db));
app.use("/story", viewStory(db));
app.use("/deleteStory", deleteStory(db));
// Note: mount other resources here, using the same pattern above
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  db.query(
    `
    SELECT title, users.name as author, stories.status, stories.created_on,
      LEFT(contents,100) as contents, stories.id,
      count(contributions.id) as contributions_count
    FROM stories
    JOIN users ON users.id = stories.author_id
    LEFT JOIN contributions ON stories.id = contributions.story_id
    GROUP BY stories.id, users.id
    ORDER BY stories.created_on;
    `
  )
    .then((result) => {
      let user = undefined;
      if (req.session.userId) {
        user = req.session.userId;
      }
      let view = 'home';
      const templateVars = { user, stories: result.rows, view };
      res.render("index", templateVars);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    });
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

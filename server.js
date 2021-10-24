// load .env data into process.env
require("dotenv").config();
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
    keys: ['key1', 'key2'],
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
    const storiesRoutes = require("./routes/stories")

    // Mount all resource routes
    // Note: Feel free to replace the example routes below with your own
    app.use("/api/users", usersRoutes(db));
    app.use("/api/stories", storiesRoutes(db));
    app.use("/api/login", loginRoute(db));
    // Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.query (`
    SELECT title, users.name as author, status, LEFT(contents,100) as contents
    FROM stories
    JOIN users ON users.id = stories.author_id;
  `)
  .then((result) => {
    const templateVars = {user : undefined, stories: result.rows};
    console.log('connection started');
    res.render("index", templateVars);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

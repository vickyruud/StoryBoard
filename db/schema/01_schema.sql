-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  contents TEXT,
  status VARCHAR(255) DEFAULT 'In Progress',
  created_on DATE NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution_text TEXT,
  status VARCHAR(255) DEFAULT 'In Progress',
  created_on DATE NOT NULL,
  votes INTEGER DEFAULT 0,
  contributor_id INTEGER REFERENCES users(id)  ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE
);

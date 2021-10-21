const database = require("../database");


const login = function (email, password) {
  return database.getUserWithEmail(email).then((user) => {
    if (password === user.password) {
      return user;
    }
    return null;
  });
};
module.exports = login;


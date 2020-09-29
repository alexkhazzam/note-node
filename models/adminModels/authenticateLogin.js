const fs = require('fs');
const path = require('path');

exports.AuthenticateLogin = class {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  verifyCredentials() {
    let id = null;
    let users = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'users.json'),
      'utf-8'
    );
    const PARSED_USERS = [...JSON.parse(users)];
    PARSED_USERS.forEach((user) => {
      if (user.password === this.password && user.username === this.username) {
        id = user.id;
      }
    });
    return id;
  }
};

const fs = require('fs');
const path = require('path');

exports.CreateAccount = class {
  verifyEmail(email) {
    this.email = email;
    let emailUnique = true;
    let PARSED_EMAILS = null;
    const emails = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'emails.json')
    );
    PARSED_EMAILS = [...JSON.parse(emails)];
    PARSED_EMAILS.forEach((email) => {
      if (email === this.email) {
        emailUnique = false;
      }
    });
    return emailUnique;
  }

  verifyPasswords() {}

  verifyUsername(username) {
    this.username = username;
    let usernameUnique = true;
    let PARSED_USERNAMES = null;
    const usernameData = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'usernames.json'),
      'utf-8'
    );
    PARSED_USERNAMES = [...JSON.parse(usernameData)];
    PARSED_USERNAMES.forEach((usrName) => {
      if (usrName === username) {
        usernameUnique = false;
      }
    });
    return usernameUnique;
  }

  saveCredentials() {}
};

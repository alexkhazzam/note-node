const fs = require('fs');
const path = require('path');

exports.CreateAccount = class {
  constructor(email, name, lastname, username, password) {
    this.userEmail = email;
    this.userName = name;
    this.userLastname = lastname;
    this.userUsername = username;
    this.userPassword = password;
  }
  verifyEmail(email) {
    this.email = email;
    let emailUnique = true;
    let PARSED_EMAILS = null;
    const emails = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'emails.json')
    );
    PARSED_EMAILS = [...JSON.parse(emails)];
    this.parsedEmails = [...PARSED_EMAILS];
    PARSED_EMAILS.forEach((email) => {
      if (email === this.email) {
        emailUnique = false;
      }
    });
    return emailUnique;
  }

  verifyPasswords(password, confirmPass) {
    if (password === confirmPass) {
      return true;
    } else {
      return false;
    }
  }

  verifyUsername(username) {
    this.username = username;
    let usernameUnique = true;
    let PARSED_USERNAMES = null;
    const usernameData = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'usernames.json'),
      'utf-8'
    );
    PARSED_USERNAMES = [...JSON.parse(usernameData)];
    this.parsedUsernames = [...PARSED_USERNAMES];
    PARSED_USERNAMES.forEach((usrName) => {
      if (usrName === username) {
        usernameUnique = false;
      }
    });
    return usernameUnique;
  }

  saveCredentials() {
    const JSON_OBJ = {
      email: this.userEmail,
      firstname: this.userName,
      lastname: this.userLastname,
      username: this.userUsername,
      password: this.userPassword,
      id: Math.random(),
    };
    const userInfo = fs.readFileSync(
      path.join(__dirname, '../', '../', 'data', 'users.json'),
      'utf-8'
    );
    const PARSED_USER_INFO = [...JSON.parse(userInfo)];
    PARSED_USER_INFO.push(JSON_OBJ);
    fs.writeFileSync(
      path.join(__dirname, '../', '../', 'data', 'users.json'),
      JSON.stringify(PARSED_USER_INFO)
    );
    const EMAILS_PARSED = [...this.parsedEmails];
    EMAILS_PARSED.push(this.email);
    fs.writeFileSync(
      path.join(__dirname, '../', '../', 'data', 'emails.json'),
      JSON.stringify(EMAILS_PARSED)
    );
    const USERNAMES_PARSED = [...this.parsedUsernames];
    USERNAMES_PARSED.push(this.username);
    fs.writeFileSync(
      path.join(__dirname, '../', '../', 'data', 'usernames.json'),
      JSON.stringify(USERNAMES_PARSED)
    );
    console.log('done');
  }
};

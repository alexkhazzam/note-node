const Register = require('../models/adminModels/register');
const AuthLogin = require('../models/adminModels/authenticateLogin');
const fs = require('fs');
const path = require('path');

exports.getRegister = (req, res, next) => {
  res.render('register');
};

exports.getSlash = (req, res, next) => {
  res.redirect('/register');
};

exports.postRegister = (req, res, next) => {
  let invalidResults = 0;
  const credentialObj = {
    email: req.body.email,
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  const register = new Register.CreateAccount(
    credentialObj.email,
    credentialObj.name,
    credentialObj.lastname,
    credentialObj.username,
    credentialObj.password
  );
  const emailUnique = register.verifyEmail(credentialObj.email);
  const usernameUnique = register.verifyUsername(credentialObj.username);
  const passwordsMatch = register.verifyPasswords(
    credentialObj.password,
    req.body.confirmPassword
  );
  if (!emailUnique) {
    console.log('email not unique');
    invalidResults++;
    return;
  }
  if (!usernameUnique) {
    console.log('username not unique');
    invalidResults++;
    return;
  }
  if (!passwordsMatch) {
    console.log('passwords do not match');
    invalidResults++;
    return;
  }
  if (invalidResults === 0) {
    register.saveCredentials();
    console.log('done');
    res.redirect('/login');
  }
};

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  const authLogin = new AuthLogin.AuthenticateLogin(
    req.body.username,
    req.body.password
  );
  const userId = authLogin.verifyCredentials();
  if (userId === null) {
    console.log('Not Authenticated');
  } else {
    const app = fs.readFileSync(
      `${__dirname}/routes/authenticationRoutes`,
      'utf-8'
    );
    console.log(app);
    console.log('Authenticated');
    res.redirect(userId);
  }
};

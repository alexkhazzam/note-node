const Register = require('../models/adminModels/register');

exports.getRegister = (req, res, next) => {
  res.render('register');
};

exports.getSlash = (req, res, next) => {
  res.redirect('/register');
};

exports.postRegister = (req, res, next) => {
  const credentialObj = {
    email: req.body.email,
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    Id: Math.random(),
  };
  const register = new Register.CreateAccount();
  const emailUnique = register.verifyEmail(credentialObj.email);
  const usernameUnique = register.verifyUsername(credentialObj.username);
  const passwordsMatch = register.verifyPasswords(
    credentialObj.password,
    req.body.confirmPassword
  );
  if (!emailUnique) {
    console.log('email not unique');
    return;
  }
  if (!usernameUnique) {
    console.log('username not unique');
    return;
  }
};

exports.getLogin = (req, res, next) => {
  res.render('login');
};

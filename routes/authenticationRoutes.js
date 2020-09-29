const Express = require('express');
const Router = Express.Router();
const fs = require('fs');
const path = require('path');

const authenticationController = require('../controllers/authenticationController');

const userInfo = fs.readFileSync(
  path.join(__dirname, '../', 'data', 'users.json'),
  'utf-8'
);

Router.get('/', authenticationController.getSlash);
Router.get('/login', authenticationController.getLogin);
Router.post('/login', authenticationController.postLogin);
Router.post('/register', authenticationController.postRegister);
Router.get('/register', authenticationController.getRegister);

module.exports = Router;

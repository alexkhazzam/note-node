const Express = require('express');
const Router = Express.Router();

const authenticationController = require('../controllers/authenticationController');

Router.get('/', authenticationController.getSlash);
Router.get('/login', authenticationController.getLogin);
Router.post('/register', authenticationController.postRegister);
Router.get('/register', authenticationController.getRegister);

module.exports = Router;

const Express = require('express');
const Router = Express.Router();

const adminController = require('../controllers/adminController.js');

Router.get('/add-note', adminController.addNote);

module.exports = Router;

const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const contacts = require('./data').all;
const queries = {
  contacts: require('../db/contacts')
};

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('index', renderObject);
    }
  });
});

router.get('/contacts', (req, res, next) => {
  queries.contacts.get().then((contacts) => {
    res.render('contacts', { contacts });
  });
});

module.exports = router;

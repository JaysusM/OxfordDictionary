var express = require('express');
var router = express.Router();
var definitionController = require('.././controllers/definitionController.js')

router.get('/', function(req, res) {
  res.render('index', { title: 'DefineIt!', definitions: [], word: ''});
});

router.post('/', definitionController.postGetWordDefinition);

module.exports = router;

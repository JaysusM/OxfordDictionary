const request = require('request');
const app_id = '9465ff6d';
const app_key = '2708151b4d5c268826dfeef8abac97f2';
const api_base_url = 'https://od-api.oxforddictionaries.com/api/v1';
const headers = {
  "Accept": "application/json",
  "app_id": "9465ff6d",
  "app_key": "2708151b4d5c268826dfeef8abac97f2"
};

module.exports = {
  postGetWordDefinition : function(req, res) {
    let word = req.body.searchBar;
    if(word != '') {
    let webPage = api_base_url + '/entries/en/' + word.toLowerCase();
    return request(
      {
        url: webPage,
        headers: headers,
      },
      function(err, response, body) {
        try {
        let definition = JSON.parse(body);
        let parsedDefinitions = definition.results[0].lexicalEntries[0].entries[0].senses;
        var definitionValues = [];
        for(var i =0; i < parsedDefinitions.length; i++) {
          definitionValues.push(parsedDefinitions[i].definitions[0]);
        }
        return res.render('index', {title: 'DefineIt! > ' + word, word: word, definitions: definitionValues});
      } catch (e) {
        return res.redirect('back');
      }
      }
    );
    }
    return res.render('index', {title: 'DefineIt!', word: '', definitions: []});
  }
}

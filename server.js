const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Who Am I';

app.get('/', function(request, response) {
  response.send(app.locals.title);
});

app.get('/api/traits', function(request, response) {
  let traits = app.locals.traits;

  response.json( { traits });
});

app.get('/api/traits/:id', function(request, response) {
  let id    = request.params.id;
  let trait = app.locals.traits[id];

  if (!trait) { return response.sendStatus(404) };

  response.json({ id, trait });
})

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
};

module.exports = app;

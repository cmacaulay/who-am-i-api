const assert = require('assert');
const request = require('request');
const app = require('../server');

describe('Server', function() {

  before(function(done) {
    this.port = 9999;

    this.server = app.listen(this.port, function(err, result) {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9999/'
    });
  });

  after(function() {
    this.server.close();
  });

  it('should exist', function() {
    assert(app);
  });

  describe('GET /', function() {
    it('should return a 200', function(done) {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    it('should have a body with the name of the application', function(done) {
      const title = app.locals.title

      this.request.get('/', function(error, response) {
        if (error) { done(error) }
        assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
               done();
             });
    });
  });

  describe('GET /api/traits/:id', function(){
    beforeEach(function() {
      app.locals.traits = {
        1: {name: "Third Culture Kid",
            description: "American passport, German upbringing",
          }
      };
    });
    it('should return a 404 if the resource is not found', function(done) {
      this.request.get('/api/traits/hihi', function(error, response) {
        if (error) { done(error) };
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return the correct data from my trait', function(done) {
      const id   = 1;
      const data = app.locals.traits[id]

      this.request.get('/api/traits/1', function(error, response) {
        if (error) { done(error) };
        assert(response.body.includes(id),
          `${response.body} does not include "${id}".`);
        assert(response.body.includes(data["name"]),
          `${response.body} does not include "${data["name"]}".`);
        assert(response.body.includes(data["description"]),
          `${response.body} does not include "${data["description"]}".`);
        done();
      })
    });
  });

});

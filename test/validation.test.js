/* jshint mocha: true */
var Validator = require('jsonschema').Validator;
var romanize = require('romanize');
var path = require('path');
var expect = require('chai').expect;
var glob = require('glob');
var jsonFiles = glob.sync('data/**/*.json');

var validator = new Validator();
validator.addSchema(require('../schemas/paragraph'), '/paragraph');
validator.addSchema(require('../schemas/item'), '/item');
var schema = require('../schemas/provision.json');

describe('files', function() {
  jsonFiles.forEach(function(jsonFile) {
    describe(jsonFile, function() {
      var json = require('../' + jsonFile);
      var parsedPath = path.parse(jsonFile);

      it('validates', function() {
        expect(validator.validate(json, schema).errors)
          .to.be.eql([]);
      });

      it('is correctly numbered', function() {
        expect(json.provision[json.provision.length - 1].number)
          .to.equal(parsedPath.base.replace('.json',''));
      });

      it('is in the right directory', function() {
        var dir = parsedPath.dir;
        var containingDir = dir.slice(dir.lastIndexOf(/\/|\\/) - 1);
        expect(json.provision[json.provision.length - 2].number)
          .to.equal(romanize(parseInt(containingDir)));
      });
    });
  });
});

/* jshint mocha: true */
var Validator = require('jsonschema').Validator;
var expect = require('chai').expect;
var glob = require('glob');
var jsonFiles = glob.sync('data/**/*.json');

var validator = new Validator();
validator.addSchema(require('../schemas/paragraph'), '/paragraph');
validator.addSchema(require('../schemas/item'), '/item');
var schema = require('../schemas/section.json');

describe('files', function() {
  jsonFiles.forEach(function(jsonFile) {
    describe(jsonFile, function() {
      it('validates', function() {
        var json = require('../' + jsonFile);
        expect(validator.validate(json, schema).errors)
          .to.be.eql([]);
      });
    });
  });
});

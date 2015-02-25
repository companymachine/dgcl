var fs = require('fs');
var jsonFile = process.argv[2];
var json = JSON.parse(fs.readFileSync(jsonFile));

var out = fs.createWriteStream(jsonFile.replace(/\.json$/, '.md'));

var indentation = function(level) {
  return level < 1 ? '' : new Array((level * 2) + 1).join(' ');
};

var renderElement = function(depth, element) {
  if ('type' in element) {
    out.write('\n\n' + indentation(depth) + '- ');
    if (element.type === 'blockquote') {
      out.write('> ');
    }
    out.write(element.text);
  } else if ('number' in element) {
    out.write('\n\n' + indentation(depth));
    out.write('- ' + element.number.replace('.', '\\.') + ' ');
    if (typeof element.content === 'string') {
      out.write(element.content);
    } else {
      element.content.forEach(renderElement.bind(this, depth + 1));
    }
  }
};

out.write('# Section ' + json.provision[json.provision.length - 1].number);
out.write('\n\n' + json.heading + '.');
json.content.forEach(renderElement.bind(this, 0));

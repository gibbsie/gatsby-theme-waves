const { parse } = require("shell-quote");

module.exports.readStepFromElement = function(pre) {
  if (!pre.children || !pre.children[0]) {
    return null;
  }

  const codeElement = pre.children[0];

  const { className, metastring } = codeElement.properties;
  const code = codeElement.children[0].value;

  return {
    code,
    lang: className[0].substring("language-".length),
    ...parseMetastring(metastring)
  };
};

function parseMetastring(metastring) {
  if (!metastring) {
    return {};
  }

  const argv = parse(metastring);

  const result = {};
  argv.forEach(arg => {
    if (!arg.includes("=")) {
      result.focus = arg;
    } else {
      const [key, value] = arg.split(/=(.*)/);
      result[key] = value;
    }
  });
  return result;
}

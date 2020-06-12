"use strict";

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var diff = require("diff");
var React = _interopDefault(require("react"));
var Prism = _interopDefault(require("prismjs"));
var flat = _interopDefault(require("array.prototype.flat"));

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function grammarNotFound(_ref2) {
  var lang = _ref2.lang;
  return {
    element: React.createElement(ErrorBox, {
      header: "Oops, there's a problem",
      body: React.createElement(
        React.Fragment,
        null,
        "Syntax highlighter for ",
        React.createElement(Mark, null, '"', lang, '"'),
        " not found.",
        React.createElement(
          "p",
          null,
          "You can try importing it from prismjs with: ",
          React.createElement("br", null),
          React.createElement(
            Mark,
            null,
            'import "prismjs/components/prism-',
            lang,
            '"'
          )
        ),
        "(See",
        " ",
        React.createElement(
          "a",
          {
            href: "https://prismjs.com/#supported-languages",
            style: {
              color: "grey"
            }
          },
          "all the supported languages"
        ),
        ")"
      )
    })
  };
}
function invalidFocusNumber(n) {
  return {
    withFocusString: function withFocusString(focusString) {
      return {
        withStepIndex: function withStepIndex(stepIndex) {
          return {
            element: React.createElement(ErrorBox, {
              header: React.createElement(StepErrorHeader, {
                stepIndex: stepIndex
              }),
              body: React.createElement(
                React.Fragment,
                null,
                React.createElement(Mark, null, '"', n, '"'),
                " isn't a valid number",
                " ",
                n != focusString &&
                  React.createElement(Mark, null, ' (in "', focusString, '")')
              )
            })
          };
        }
      };
    }
  };
}
function invalidLineOrColumnNumber() {
  return {
    withFocusString: function withFocusString(focusString) {
      return {
        withStepIndex: function withStepIndex(stepIndex) {
          return {
            element: React.createElement(ErrorBox, {
              header: React.createElement(StepErrorHeader, {
                stepIndex: stepIndex
              }),
              body: React.createElement(
                React.Fragment,
                null,
                'Are you using "0" as a line or column number',
                " ",
                React.createElement(Mark, null, 'in "', focusString, '"'),
                "?",
                React.createElement("br", null),
                "(Line and column numbers should start at 1, not 0) ",
                React.createElement("br", null)
              )
            })
          };
        }
      };
    }
  };
}

function ErrorBox(_ref3) {
  var header = _ref3.header,
    body = _ref3.body;
  return React.createElement(
    "div",
    {
      style: {
        background: "#290000",
        color: "#b96f70",
        border: "2px solid #b96f70",
        padding: "10px 30px",
        maxWidth: "90vw",
        margin: "0 auto",
        fontFamily: "monospace",
        fontSize: "1rem"
      }
    },
    React.createElement("h3", null, header),
    React.createElement("p", null, body)
  );
}

function StepErrorHeader(_ref4) {
  var stepIndex = _ref4.stepIndex;
  return React.createElement(
    React.Fragment,
    null,
    "Oops, there's a problem with the",
    " ",
    React.createElement(
      Mark,
      null,
      stepIndex + 1,
      React.createElement("sup", null, ordinal(stepIndex + 1)),
      " step"
    )
  );
}

function Mark(_ref5) {
  var children = _ref5.children;
  return React.createElement(
    "mark",
    {
      style: {
        background: "none",
        color: "pink",
        fontWeight: "bolder"
      }
    },
    children
  );
}

function ordinal(i) {
  var j = i % 10,
    k = i % 100;

  if (j == 1 && k != 11) {
    return "st";
  }

  if (j == 2 && k != 12) {
    return "nd";
  }

  if (j == 3 && k != 13) {
    return "rd";
  }

  return "th";
}

var newlineRe = /\r\n|\r|\n/; // Take a list of nested tokens
// (token.content may contain an array of tokens)
// and flatten it so content is always a string
// and type the type of the leaf

function flattenTokens(tokens) {
  var flatList = [];
  tokens.forEach(function(token) {
    var type = token.type,
      content = token.content;

    if (Array.isArray(content)) {
      flatList.push.apply(flatList, flattenTokens(content));
    } else {
      flatList.push({
        type: type,
        content: content
      });
    }
  });
  return flatList;
}

function wrapToken(prismToken, parentType) {
  if (parentType === void 0) {
    parentType = "plain";
  }

  if (typeof prismToken === "string") {
    return {
      type: parentType,
      content: prismToken
    };
  }

  if (Array.isArray(prismToken.content)) {
    return {
      type: prismToken.type,
      content: tokenizeStrings(prismToken.content, prismToken.type)
    };
  }

  return wrapToken(prismToken.content, prismToken.type);
} // Wrap strings in tokens

function tokenizeStrings(prismTokens, parentType) {
  if (parentType === void 0) {
    parentType = "plain";
  }

  return prismTokens.map(function(prismToken) {
    return wrapToken(prismToken, parentType);
  });
}

function tokenize(code, language) {
  if (language === void 0) {
    language = "javascript";
  }

  var grammar = Prism.languages[language];

  if (!grammar) {
    throw grammarNotFound({
      lang: language
    });
  }

  var prismTokens = Prism.tokenize(code, Prism.languages[language]);
  var nestedTokens = tokenizeStrings(prismTokens);
  var tokens = flattenTokens(nestedTokens);
  var currentLine = [];
  var lines = [currentLine];
  tokens.forEach(function(token) {
    var contentLines = token.content.split(newlineRe);
    var firstContent = contentLines.shift();

    if (firstContent !== undefined && firstContent !== "") {
      currentLine.push({
        type: token.type,
        content: firstContent
      });
    }

    contentLines.forEach(function(content) {
      currentLine = [];
      lines.push(currentLine);

      if (content !== "") {
        currentLine.push({
          type: token.type,
          content: content
        });
      }
    });
  });
  return lines;
}

var newlineRe$1 = /\r\n|\r|\n/;

function myDiff(oldCode, newCode) {
  var changes = diff.diffLines(oldCode || "", newCode);
  var oldIndex = -1;
  return changes.map(function(_ref) {
    var value = _ref.value,
      count = _ref.count,
      removed = _ref.removed,
      added = _ref.added;
    var lines = value.split(newlineRe$1); // check if last line is empty, if it is, remove it

    var lastLine = lines.pop();

    if (lastLine) {
      lines.push(lastLine);
    }

    var result = {
      oldIndex: oldIndex,
      lines: lines,
      count: count,
      removed: removed,
      added: added
    };

    if (!added) {
      oldIndex += count || 0;
    }

    return result;
  });
}

function insert(array, index, elements) {
  return array.splice.apply(array, [index, 0].concat(elements));
}

function slideDiff(lines, codes, slideIndex, language) {
  var prevLines = lines.filter(function(l) {
    return l.slides.includes(slideIndex - 1);
  });
  var prevCode = codes[slideIndex - 1] || "";
  var currCode = codes[slideIndex];
  var changes = myDiff(prevCode, currCode);
  changes.forEach(function(change) {
    if (change.added) {
      var prevLine = prevLines[change.oldIndex];
      var addAtIndex = lines.indexOf(prevLine) + 1;
      var addLines = change.lines.map(function(content) {
        return {
          content: content,
          slides: [slideIndex],
          tokens: []
        };
      });
      insert(lines, addAtIndex, addLines);
    } else if (!change.removed) {
      for (var j = 1; j <= (change.count || 0); j++) {
        prevLines[change.oldIndex + j].slides.push(slideIndex);
      }
    }
  });
  var tokenLines = tokenize(currCode, language);
  var currLines = lines.filter(function(l) {
    return l.slides.includes(slideIndex);
  });
  currLines.forEach(function(line, index) {
    return (line.tokens = tokenLines[index]);
  });
}

function parseLines(codes, language) {
  var lines = [];

  for (var slideIndex = 0; slideIndex < codes.length; slideIndex++) {
    slideDiff(lines, codes, slideIndex, language);
  }

  return lines;
}
function getSlides(codes, language) {
  // codes are in reverse cronological order
  var lines = parseLines(codes, language); // console.log("lines", lines);

  return codes.map(function(_, slideIndex) {
    return lines
      .map(function(line, lineIndex) {
        return {
          content: line.content,
          tokens: line.tokens,
          isNew: !line.slides.includes(slideIndex + 1),
          show: line.slides.includes(slideIndex),
          key: lineIndex
        };
      })
      .filter(function(line) {
        return line.show;
      });
  });
}
function getCodes(rawSteps) {
  var codes = [];
  rawSteps.forEach(function(s, i) {
    if (s.lang === "diff" && i > 0) {
      codes[i] = diff.applyPatch(codes[i - 1], s.code);
    } else {
      codes[i] = s.code;
    }
  });
  return codes;
}

function parseFocus(focus) {
  if (!focus) {
    throw new Error("Focus cannot be empty");
  }

  try {
    var parts = focus.split(/,(?![^\[]*\])/g).map(parsePart);
    return new Map(flat(parts));
  } catch (error) {
    if (error.withFocusString) {
      throw error.withFocusString(focus);
    } else {
      throw error;
    }
  }
}

function parsePart(part) {
  // a part could be
  // - a line number: "2"
  // - a line range: "5:9"
  // - a line number with a column selector: "2[1,3:5,9]"
  var columnsMatch = part.match(/(\d+)\[(.+)\]/);

  if (columnsMatch) {
    var line = columnsMatch[1],
      columns = columnsMatch[2];
    var columnsList = columns.split(",").map(expandString);
    var lineIndex = Number(line) - 1;
    var columnIndexes = flat(columnsList).map(function(c) {
      return c - 1;
    });
    return [[lineIndex, columnIndexes]];
  } else {
    return expandString(part).map(function(lineNumber) {
      return [lineNumber - 1, true];
    });
  }
}

function expandString(part) {
  // Transforms something like
  // - "1:3" to [1,2,3]
  // - "4" to [4]
  var _part$split = part.split(":"),
    start = _part$split[0],
    end = _part$split[1]; // todo check if start is 0, line numbers and column numbers start at 1

  if (!isNaturalNumber(start)) {
    throw invalidFocusNumber(start);
  }

  var startNumber = Number(start);

  if (startNumber < 1) {
    throw invalidLineOrColumnNumber();
  }

  if (!end) {
    return [startNumber];
  } else {
    if (!isNaturalNumber(end)) {
      throw invalidFocusNumber(end);
    }

    var list = [];

    for (var i = startNumber; i <= +end; i++) {
      list.push(i);
    }

    return list;
  }
}

function isNaturalNumber(n) {
  n = n.toString(); // force the value in case it is not

  var n1 = Math.abs(n),
    n2 = parseInt(n, 10);
  return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

function parseSteps(rawSteps, lang) {
  var codes = getCodes(rawSteps);
  var stepsLines = getSlides(codes.reverse(), lang).reverse();
  var steps = rawSteps.map(function(step, i) {
    var lines = stepsLines[i];

    try {
      return parseStep(step, lines);
    } catch (e) {
      if (e.withStepIndex) {
        throw e.withStepIndex(i);
      } else {
        throw e;
      }
    }
  });
  steps.forEach(function(step) {
    var lines = step.lines,
      focusMap = step.focusMap;
    lines.forEach(function(line, index) {
      line.focus = focusMap.has(index);
      var columnFocus = focusMap.get(index);
      line.focusPerToken = Array.isArray(columnFocus);

      if (Array.isArray(columnFocus)) {
        // this mutates the tokens array in order to change it to the same line in other steps
        splitTokensToColumns(line.tokens);
        line.tokens = setTokenFocus(line.tokens, columnFocus);
      }
    });
  });
  return steps;
}

function parseStep(step, lines) {
  var focus = step.focus,
    rest = _objectWithoutPropertiesLoose(step, ["focus"]);

  var focusMap = focus ? parseFocus(focus) : getDefaultFocus(lines);
  var focusIndexes = Array.from(focusMap.keys());
  var focusStart = Math.min.apply(Math, focusIndexes);
  var focusEnd = Math.max.apply(Math, focusIndexes);
  return _extends(
    {
      lines: lines,
      focusMap: focusMap,
      focusStart: focusStart,
      focusEnd: focusEnd,
      focusCenter: (focusStart + focusEnd + 1) / 2,
      focusCount: focusEnd - focusStart + 1
    },
    rest
  );
}

function getDefaultFocus(lines) {
  var indexes = lines
    .map(function(line, index) {
      return line.isNew ? index : -1;
    })
    .filter(function(index) {
      return index !== -1;
    });
  return new Map(
    indexes.map(function(i) {
      return [i, true];
    })
  );
}

function splitTokensToColumns(tokenArray) {
  var tokens = Array.from(tokenArray);
  var key = 0;
  tokenArray.splice(0, tokenArray.length);
  tokens.forEach(function(token) {
    var chars = Array.from(token.content);
    chars.forEach(function(_char) {
      return tokenArray.push(
        _extends({}, token, {
          content: _char,
          key: key++
        })
      );
    });
  });
}

function setTokenFocus(tokens, focusColumns) {
  // Assumes that tokens are already splitted in columns
  // Return new token objects to avoid changing other steps tokens
  return tokens.map(function(token, i) {
    return _extends({}, token, {
      focus: focusColumns.includes(i)
    });
  });
}

exports.parseSteps = parseSteps;
//# sourceMappingURL=parser.cjs.development.js.map

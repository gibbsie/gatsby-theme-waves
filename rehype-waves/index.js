var visit = require("unist-util-visit");
const { parseSteps } = require("@code-surfer/step-parser");
const { readStepFromElement } = require("./step-reader");
const Prism = require("prismjs");

module.exports = slug;

function slug() {
  return transformer;
}

function transformer(tree) {
  visit(tree, "jsx", (node, index, parent) => {
    // for each CodeWave
    if (node.value.startsWith("<CodeWave")) {
      const siblings = parent.children;
      const firstChildIndex = index + 1;
      let i = firstChildIndex;
      let pres = [];
      let nesting = 0;

      // find the codeblocks and store them in the `pres` array
      while (i < siblings.length && siblings[i].value !== "</CodeWave>") {
        const sibling = siblings[i];

        if (sibling.type === "jsx" && isOpenTag(sibling.value)) {
          nesting++;
        }
        if (sibling.type === "jsx" && isCloseTag(sibling.value)) {
          nesting--;
        }

        if (!nesting && sibling.tagName === "pre") {
          pres.push(sibling);
        }
        i++;
      }
      const lastChildIndex = i - 1;

      if (!pres.length) {
        return;
      }

      // replace the code blocks and wrap the markdown elements in divs
      siblings[siblings.indexOf(pres[0])] = { type: "jsx", value: "<div>" };
      siblings.splice(
        lastChildIndex,
        0,
        { type: "text", value: "\n" },
        { type: "jsx", value: "</div>" }
      );
      for (let prei = 1; prei < pres.length; prei++) {
        const siblingi = siblings.indexOf(pres[prei]);
        siblings.splice(
          siblingi,
          1,
          { type: "jsx", value: "</div>" },
          { type: "text", value: "\n" },
          { type: "jsx", value: "<div>" }
        );
      }

      // parse the codeblocks into input steps
      const steps = pres.map(readStepFromElement);

      // parse the input steps
      const lang = steps[0].lang;
      if (!Prism.languages[lang]) {
        require(`prismjs/components/prism-${lang}`);
      }

      const s = parseSteps(steps);

      // pass the parsed steps prop to CodeWave
      node.value = node.value.replace(
        ">",
        ` parsedSteps={${JSON.stringify(s)}}>`
      );
    }
  });
}

function isOpenTag(value) {
  return /^\s*<([^\/>]*)>\s*$/.test(value);
}

function isCloseTag(value) {
  return /^\s*<\/([^\/>]*)>\s*$/.test(value);
}

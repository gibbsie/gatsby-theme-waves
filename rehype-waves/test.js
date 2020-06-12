const fs = require("fs");
const { toMatchFile } = require("jest-file-snapshot");
const compile = require("@mdx-js/mdx");
const plugin = require("./index");

expect.extend({ toMatchFile });

fs.readdirSync("__fixtures__/").forEach(filename => {
  test(filename, () => {
    const mdx = fs.readFileSync("__fixtures__/" + filename, "utf8");
    expect(compile.sync(mdx, { rehypePlugins: [plugin] })).toMatchFile();
  });
});

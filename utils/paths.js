const path = require("path");

function inNew(tech) {
  return path.join(__dirname, "..", "template", tech);
}

function outDir(name) {
  return path.join(process.cwd(), name);
}

module.exports = { inNew, outDir };

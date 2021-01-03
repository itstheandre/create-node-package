const meow = require("meow");
const meowHelp = require("cli-meow-help");

const flags = {
  ts: {
    type: "boolean",
    default: false,
    desc: "Does this project use typescript?",
  },
  js: {
    type: "boolean",
    default: false,
    desc: "Does this project use javascript?",
  },
};

const commands = {
  "<project-name>": {
    desc: `The name of the initial setup in the package.json`,
  },
};

const helpText = meowHelp({ flags, commands, name: "Create Node Package" });

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, { options });

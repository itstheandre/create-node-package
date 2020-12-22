const inquirer = require("inquirer");
const fs = require("fs");
const handleError = require("cli-handle-error");
const shouldCancel = require("cli-should-cancel");
const { isNotEmpty } = require("./checkName");

module.exports = async ({ name, ...rest }) => {
  try {
    const data = await inquirer.prompt({ name, ...rest });

    return data[name].split(" ").join("-");
  } catch (error) {
    console.log("error:", error);
    handleError(`INPUT`, error);
  }
};

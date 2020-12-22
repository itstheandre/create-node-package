const inquirer = require("inquirer");

async function askTech() {
  const { tech } = await inquirer.prompt({
    type: "list",
    name: "tech",
    message: "What type of package will this be?",
    choices: ["javascript", "typescript"],
  });

  return tech;
}

exports.getTech = async ({ js, ts }) => {
  if (ts) {
    return "ts";
  }
  if (js) {
    return "js";
  }

  return (await askTech()) === "javascript" ? "js" : "ts";
};

const cli = require("./utils/cli");
const getName = require("./utils/getName");
const init = require("./utils/init");
const { inNew, outDir } = require("./utils/paths");
const question = require("./utils/question");
const performCopy = require("./utils/performCopy");
const { getTech } = require("./utils/techUsed");
const { input, flags, showHelp } = cli;
const { help = false, js = false, ts = false } = flags;

async function main() {
  init();
  if (help) {
    return showHelp(0);
  }

  let { name, issue } = getName(input);
  if (!name) {
    name = await question({
      message: "Project name?",
      issue,
      name: "name",
      hint: "(This will be the name in package.json)",
    });
  }

  const description = await question({
    message: "Project description",
    hint: "(This will be the description in the package.json)",
    name: "description",
    isValidate: false,
  });

  const tech = await getTech({ js, ts });

  const inDirPath = inNew(tech);
  const outDirPath = outDir(name);
  const vars = { name, description };
  return performCopy({ inDirPath, outDirPath, vars });
}

main();

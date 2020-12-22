const { green: g, dim: d, yellow: y, blue: b } = require("chalk");
const copy = require("copy-template-dir");
const alert = require("cli-alerts");
const path = require("path");
const ora = require("ora");
const execa = require("execa");
const fs = require("fs");
const getPackage = require("get-repo-package-json");
const pkg = require("../package.json");
const { basename } = path;

const spinner = ora({ text: "" });

module.exports = ({ inDirPath, outDirPath, vars }) => {
  const { name: outDir } = vars;

  copy(inDirPath, outDir, vars, async (err, createdFiles) => {
    if (err) throw err;

    console.log();
    console.log(d(`\nCreating files in $${g(`./${outDir}`)}`));

    createdFiles.forEach((filePath) => {
      const fileName = basename(filePath);
      console.log(`${g("CREATED")}: ${fileName}`);
    });

    console.log();
    let isSameVersion = true;
    spinner.start(
      `${y("INSTALLING")} dependencies...\n\n${d(`It make take a moment`)}`
    );
    process.chdir(outDir);
    const install = execa("pnpm", ["install"]);
    // const onlineVersion = getPackage(§)
    const data = await Promise.all([install]);

    spinner.succeed(`${g("FINISHED")} instalation...`);

    alert({
      type: "success",
      name: `ALL DONE`,
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`
      )} directory`,
    });

    return alert({
      type: `info`,
      msg: `Project bootstrapped successfully.\n\nYou can now cd ./${outDir}`,
      name: "DONE",
    });
  });
};

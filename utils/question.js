const fs = require("fs");
const ask = require("./ask");
const { isNotEmpty } = require("./checkName");
module.exports = ({
  name,
  message,
  defaultVal,
  issue,
  hint,
  isValidate = true,
}) => {
  const mess = issue ? `${issue}: ${hint}` : hint;

  const validate = (value) => {
    console.log("value:", value);
    if (name === "name") {
      if (fs.existsSync(value)) {
        return `Directory already exists`;
      }
      if (value === "." && isNotEmpty()) {
        return `This directory is not empty, please choose a different name`;
      }
      return !value ? "Please add a value" : true;
    }
  };

  const baseObj = {
    name,
    default: defaultVal,
    type: "input",
    message: `${message} - ${mess}`,
  };

  const args = isValidate ? { ...baseObj, validate } : baseObj;

  return ask(args);
};

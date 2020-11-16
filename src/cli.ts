import meow from "meow";
import colors from "colors";
import { packer, PackerOptions } from "./packer";

const USAGE = "$ garoon-plugin-packer [options] PLUGIN_DIR";

const flagSpec = {
  out: {
    type: "string",
  },
};

const cli = meow(
  `
Usage
  ${USAGE}

Options
  --out PLUGIN_FILE: The default is "plugin.zip" in the same directory of "PLUGIN_DIR". 
`,
  {
    flags: {
      out: {
        type: "string",
      },
    },
  }
);

if (!cli.input[0]) {
  console.error(colors.red("Error: An argument `PLUGIN_DIR` is required."));
  cli.showHelp();
}

const sourceDir = cli.input[0];
const flags = Object.keys(flagSpec).reduce((prev, current) => {
  prev[current] = cli.flags[current];
  return prev;
}, {} as Record<string, any>) as PackerOptions;

(async () => {
  if (process.env.NODE_ENV === "test") {
    return console.log(JSON.stringify({ sourceDir, flags }));
  }
  try {
    await packer(sourceDir, flags);
  } catch (err) {
    console.log(colors.red(err.message));
  }
})();

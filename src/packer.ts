import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import colors from "colors";
import { GaroonPluginManifestJson } from "../types/manifest-schema";
import { checkFileExistence } from "./checkFileExistence";
import { validateManifest } from "./validateManifest";
import { createPluginZip } from "./createPluginZip";

export type PackerOptions = {
  out?: string;
};

export const packer = async (
  sourceDir: string,
  options: PackerOptions = {}
) => {
  try {
    const pluginDir = path.resolve(sourceDir);
    if (!fs.statSync(pluginDir).isDirectory()) {
      throw new Error(`${pluginDir} should be a directory.`);
    }

    const manifestJsonPath = path.join(pluginDir, "manifest.json");

    if (!fs.statSync(manifestJsonPath).isFile()) {
      throw new Error(`Manifest file ${sourceDir}/manifest.json not found.`);
    }
    const manifestJson: GaroonPluginManifestJson = JSON.parse(
      fs.readFileSync(manifestJsonPath, "utf-8")
    );

    const { valid, formattedErrorMessage } = validateManifest(manifestJson);
    if (!valid) {
      throw new Error(`Validate manifest.json.\n${formattedErrorMessage}`);
    }
    console.log(colors.green("Succeeded: Validate manifest.json."));

    const { check, error } = await checkFileExistence({
      pluginDir,
      manifestJson,
    });
    if (!check) {
      throw new Error(`Check package resources.\n${error?.message}`);
    }
    console.log(colors.green("Succeeded: Check package resources."));

    const outputDirPath = path.dirname(
      options.out ? path.resolve(options.out) : pluginDir
    );
    const outputFilePath = options.out
      ? path.resolve(options.out)
      : path.join(outputDirPath, "plugin.zip");
    await mkdirp(outputDirPath);

    const file = await createPluginZip(pluginDir, manifestJson, options);

    fs.writeFile(outputFilePath, file, (err) => {
      if (err) throw new Error(`Create ZIP file.`);
      console.log(
        colors.green(`Succeeded: Create ZIP file.\nCreated: ${outputFilePath}`)
      );
    });
  } catch (err) {
    console.log(colors.red(`Failed: ${err.message}`));
    throw new Error("Failed: Packaging process failed.");
  }
};

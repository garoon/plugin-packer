import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import { GaroonPluginManifestJson } from "../types/manifest-schema";
import { checkFileExistence } from "./file-checker";
import { validateManifest } from "./validator";
import { createPluginZip } from "./packer";

export default async (dirPath: string) => {
  try {
    const pluginDir = path.resolve(dirPath);
    if (!fs.statSync(pluginDir).isDirectory()) {
      throw new Error(`${pluginDir} should be a directory.`);
    }

    const manifestJsonPath = path.join(pluginDir, "manifest.json");

    if (!fs.statSync(manifestJsonPath).isFile()) {
      throw new Error(`Manifest file ${dirPath}/manifest.json not found.`);
    }
    const manifestJson: GaroonPluginManifestJson = JSON.parse(
      fs.readFileSync(manifestJsonPath, "utf-8")
    );

    const { valid, errors } = validateManifest(manifestJson);
    if (!valid) {
      throw new Error(`manifest.json is invalid.`);
    }
    console.log("Succeeded: manifest.json is valid.");

    const { check, error } = await checkFileExistence({
      pluginDir,
      manifestJson,
    });
    if (!check) {
      throw new Error("listed file(s) not found.");
    }
    console.log("Succeeded: file check");

    const outputDirPath = path.dirname(pluginDir);
    const outputFilePath = path.join(outputDirPath, "plugin.zip");
    await mkdirp(outputDirPath);

    const file = await createPluginZip(pluginDir, manifestJson);

    fs.writeFile(outputFilePath, file, (err) => {
      if (err) throw new Error(err.message);
      console.log("Succeeded:", outputFilePath);
    });
  } catch (err) {
    console.log("Failed:", err.message);
  }
};

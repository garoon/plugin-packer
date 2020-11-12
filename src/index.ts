import { checkFileExistence } from "./file-checker";
import { validateManifest } from "./validator";
import fs from "fs";
import path from "path";
import { GaroonPluginManifestJson } from "../types/manifest-schema";

export const pack = async (dirPath: string) => {
  try {
    const baseDir = path.resolve(dirPath);
    const dirStats = fs.statSync(baseDir);
    if (!dirStats.isDirectory()) {
      throw Error(`${baseDir} is not directory`);
    }
    const manifestJson: GaroonPluginManifestJson = JSON.parse(
      fs.readFileSync(path.join(baseDir, "./manifest.json"), "utf-8")
    );

    const { valid, errors } = validateManifest(manifestJson);
    if (!valid) {
      throw Error(`invalid manifest.json`);
    }
    console.log("manifest.json is valid");

    const { check, error } = await checkFileExistence({
      baseDir,
      manifestJson,
    });
    if (!check) {
      throw error;
    }
    console.log("file check succeeded");
  } catch (err) {
    console.log(err.message);
  }
};

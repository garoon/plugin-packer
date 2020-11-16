import { GaroonPluginManifestJson } from "../types/manifest-schema";
import path from "path";
import fs from "fs";
import { generateSourceListFromManifest } from "./generateSourceListFromManifest";

export const checkFileExistence = async ({
  pluginDir,
  manifestJson,
}: {
  pluginDir: string;
  manifestJson: GaroonPluginManifestJson;
}): Promise<{ check: boolean; error?: Error }> => {
  try {
    const sourceList = generateSourceListFromManifest(manifestJson);
    await Promise.all(
      sourceList.map((filePath) => fileExists(path.join(pluginDir, filePath)))
    ).catch((error) => {
      throw new Error(error);
    });
    return {
      check: true,
    };
  } catch (error) {
    return {
      check: false,
      error: error,
    };
  }
};

function fileExists(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(err);
      if (stats.isFile()) resolve(true);
      reject(`${filePath} is not file.`);
    });
  });
}

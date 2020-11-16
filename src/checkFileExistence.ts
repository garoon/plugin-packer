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
    const results = await Promise.all(
      sourceList.map((filePath) => fileExists(path.join(pluginDir, filePath)))
    ).catch((error) => {
      throw new Error(error);
    });
    const errors = results.filter((result) => result instanceof Error);
    if (errors.length) {
      throw new Error(
        errors.map((err: any) => `Error: ${err.message}`).join("\n")
      );
    }
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
  return new Promise((resolve) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return resolve(new Error(`'${err.path}' is missing.`));
      if (stats.isFile()) resolve(true);
      resolve(new Error(`'${filePath}' is not a file.`));
    });
  });
}

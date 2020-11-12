import { GaroonPluginManifestJson } from "../types/manifest-schema";
import path from "path";
import fs from "fs";

const checkTargetKeys = [
  "icon",
  "desktop.js",
  "desktop.css",
  "config.html",
  "config.js",
  "config.css",
];

function isRelativePath(filePath: string): boolean {
  return !/^https?:/.test(filePath);
}

export const checkFileExistence = async ({
  baseDir,
  manifestJson,
}: {
  baseDir: string;
  manifestJson: GaroonPluginManifestJson;
}): Promise<{ check: boolean; error?: Error }> => {
  try {
    await Promise.all(
      checkTargetKeys.map((key) => {
        const itemPath = getTargetPath({
          key,
          manifestJson,
        });

        if (typeof itemPath === "string") {
          return fileExists(path.join(baseDir, itemPath));
        }

        if (Array.isArray(itemPath)) {
          return Promise.all(
            itemPath
              .filter(isRelativePath)
              .map((filePath) => fileExists(path.join(baseDir, filePath)))
          );
        }
        return Promise.resolve();
      })
    );
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

function getTargetPath({
  key,
  manifestJson,
}: {
  key: string;
  manifestJson: GaroonPluginManifestJson;
}) {
  const [_name, _key] = key.split(".");
  switch (_name) {
    case "icon":
      return manifestJson.icon;
    case "desktop":
      return manifestJson.desktop?.[_key as "js" | "css"];
    case "config":
      return manifestJson.config?.[_key as "html" | "js" | "css"];
  }
}

import { GaroonPluginManifestJson } from "../types/manifest-schema";

export const generateSourceListFromManifest = (
  manifestJson: GaroonPluginManifestJson
) => {
  const sourceTypes = [
    ["desktop", "js"],
    ["desktop", "css"],
    ["config", "js"],
    ["config", "css"],
  ];
  const list = sourceTypes
    .map(([name, key]) => {
      switch (name) {
        case "desktop":
          return manifestJson[name]?.[key as "js" | "css"];
        case "config":
          return manifestJson[name]?.[key as "js" | "css"];
      }
    })
    .filter((value) => value)
    .reduce<string[]>((a, b) => (b ? a!.concat(b) : a), [])
    .filter((filePath) => !/^https?:\/\//.test(filePath));
  if (manifestJson.config?.html) {
    list.push(manifestJson.config.html);
  }
  list.push("manifest.json", manifestJson.icon);
  return list;
};

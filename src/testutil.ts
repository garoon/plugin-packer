import { GaroonPluginManifestJson } from "../types/manifest-schema";

export const createValidManifestJson = (
  overrideParams = {}
): GaroonPluginManifestJson => {
  return {
    manifest_version: 1,
    version: "1.0.0",
    target_applications: ["ALL"],
    impacted_applications: ["ALL"],
    icon: "/path/to/icon.png",
    name: {
      en: "name",
    },
    ...overrideParams,
  };
};

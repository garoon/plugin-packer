import assert from "assert";
import path from "path";
import { GaroonPluginManifestJson } from "../types/manifest-schema";
import { checkFileExistence } from "../src/checkFileExistence";

describe("checkFileExistence", () => {
  test("exists all files", async () => {
    const manifestJson: GaroonPluginManifestJson = require("./fixtures/plugin-full-manifest/manifest.json");
    const result = await checkFileExistence({
      manifestJson,
      pluginDir: path.resolve(__dirname, "./fixtures/plugin-full-manifest"),
    });
    assert(result.check);
    assert(!result.error);
  });

  test("missing file", async () => {
    const manifestJson: GaroonPluginManifestJson = require("./fixtures/plugin-missing-file/manifest.json");
    const result = await checkFileExistence({
      manifestJson,
      pluginDir: path.resolve(__dirname, "./fixtures/plugin-missing-file"),
    });
    assert(!result.check);
    assert(
      /image\/missing-file\.png' is missing\.$/.test(result.error!.message)
    );
  });
});

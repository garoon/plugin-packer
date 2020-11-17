import { generateSourceListFromManifest } from "../src/generateSourceListFromManifest";
import { createValidManifestJson } from "./helper/createValidManifestJson";

describe("generateSourceListFromManifest", () => {
  test("minimum", () => {
    const manifestJson = createValidManifestJson();
    const sourceList = generateSourceListFromManifest(manifestJson);
    expect(sourceList.length).toBe(2);
  });

  test("additional", () => {
    const manifestJson = createValidManifestJson({
      desktop: {
        js: [
          "https://js.cybozu.com/jquery/1.11.1/jquery.min.js",
          "js/index.js",
        ],
      },
      config: {
        html: "html/config.html",
        js: [
          "https://js.cybozu.com/jquery/1.11.1/jquery.min.js",
          "js/config.js",
        ],
      },
    });
    const sourceList = generateSourceListFromManifest(manifestJson);
    expect(sourceList.length).toBe(5);
  });
});

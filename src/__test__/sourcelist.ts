import { sourceListForPackage } from "../sourcelist";
import { createValidManifestJson } from "../testutil";

describe("sourcelist", () => {
  test("minimum", () => {
    const manifestJson = createValidManifestJson();
    const sourceList = sourceListForPackage(manifestJson);
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
    const sourceList = sourceListForPackage(manifestJson);
    expect(sourceList.length).toBe(5);
  });
});

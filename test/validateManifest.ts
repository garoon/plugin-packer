import { validateManifest } from "../src/validateManifest";
import { createValidManifestJson } from "./helper/createValidManifestJson";
import assert from "assert";

describe("validateManifest", () => {
  test("minimum valid json", () => {
    const result = validateManifest(createValidManifestJson());
    assert.deepStrictEqual(result, {
      valid: true,
      errors: null,
    });
  });

  test("missingProperty", () => {
    const json = createValidManifestJson();
    // @ts-ignore
    delete json.name;
    const result = validateManifest(json);
    assert.deepStrictEqual(result, {
      valid: false,
      errors: [
        {
          dataPath: ".name",
          keyword: "required",
          message: "is a required property",
          params: {
            missingProperty: "name",
          },
          schemaPath: "#/required",
        },
      ],
      formattedErrorMessage: "Error: '.name' is a required property",
    });
  });

  test("invalid", () => {
    const json = createValidManifestJson({
      manifest_version: "1",
    });
    // @ts-ignore
    delete json.name;
    const result = validateManifest(json);
    assert(result.valid === false);
    assert(result.errors?.length === 2);
  });

  test("plugin-invalid-https-url", () => {
    const json = require("./fixtures/plugin-invalid-https-url/manifest.json");
    const result = validateManifest(json);
    assert(result.valid === false);
    assert(result.errors?.length === 4);
  });

  describe("plugin-invalid-plugin_code", () => {
    test("plugin_code has more than 128 characters", () => {
      const json = require("./fixtures/plugin-invalid-plugin-code/exceed-max-length.json");
      const result = validateManifest(json);
      assert(result.valid === false);
      assert(result.errors?.length === 1);
    });

    test("plugin_code is not string", () => {
      const json = require("./fixtures/plugin-invalid-plugin-code/not-string.json");
      const result = validateManifest(json);
      assert(result.valid === false);
      assert(result.errors?.length === 1);
    });
  });
});

import { validateManifest } from "../validateManifest";
import { createValidManifestJson } from "../testUtil/createValidManifestJson";

describe("validateManifest", () => {
  test("minimum valid json", () => {
    const result = validateManifest(createValidManifestJson());
    expect(result).toEqual({
      valid: true,
      errors: null,
    });
  });

  test("missingProperty", () => {
    const json = createValidManifestJson();
    // @ts-ignore
    delete json.name;
    const result = validateManifest(json);
    expect(result).toEqual({
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
    expect(result.valid).toBe(false);
    expect(result.errors?.length).toBe(2);
  });
});

import { validateManifest } from "../validator";
import { createValidManifestJson } from "../testutil";

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

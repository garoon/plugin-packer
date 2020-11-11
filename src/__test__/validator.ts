import { validateManifest } from "../validator";

const validJson = (opts = {}) => {
  return {
    manifest_version: 1,
    version: "1.0.0",
    target_applications: [],
    impacted_applications: [],
    icon: "/path/to/icon.png",
    name: {
      en: "name",
    },
    ...opts,
  };
};

describe("validateManifest", () => {
  test("minimum valid json", () => {
    const result = validateManifest(validJson());
    expect(result).toEqual({
      valid: true,
      errors: null,
    });
  });

  test("missingProperty", () => {
    const json = validJson();
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
    const json = validJson({
      manifest_version: "1",
    });
    // @ts-ignore
    delete json.name;
    const result = validateManifest(json);
    expect(result.valid).toBe(false);
    expect(result.errors?.length).toBe(2);
  });
});

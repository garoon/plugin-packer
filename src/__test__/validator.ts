import { validateManifest } from "../validator";

describe("validateManifest", () => {
  test("valid", () => {
    expect(
      validateManifest({
        manifest_version: 1,
        version: "1.0.0",
        target_applications: ["ALL"],
        impacted_applications: ["ADDRESS_BOOK"],
        icon: "path/to/icon.png",
        name: {
          en: "validator-test",
        },
      })
    ).toEqual({
      valid: true,
      errors: null,
    });
  });

  test("invalid", () => {
    expect(
      validateManifest({
        manifest_version: "1",
      })
    ).toEqual({
      valid: true,
      errors: null,
    });
  });
});

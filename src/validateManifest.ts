import type { GaroonPluginManifestJson } from "../types/manifest-schema";
import Ajv, { ErrorObject } from "ajv";
import v4metaSchema from "ajv/lib/refs/json-schema-draft-04.json";
import jsonSchema from "../manifest-schema.json";
import { validateHttpsUrl } from "./validateHttpsUrl";

export const validateManifest = (
  manifestJson: GaroonPluginManifestJson
): {
  valid: boolean | PromiseLike<any>;
  errors?: ErrorObject[] | null;
  formattedErrorMessage?: string;
} => {
  const relativePath = (...args: any) => true;
  const ajv = new Ajv({
    schemaId: "auto", // for draft-04
    meta: false, // don't load draft-07 meta schema
    allErrors: true,
    unknownFormats: true,
    errorDataPath: "property",
    formats: {
      "http-url": (str: string) => validateHttpsUrl(str, true),
      "https-url": (str: string) => validateHttpsUrl(str),
      "relative-path": relativePath,
    },
  });
  ajv.addMetaSchema(v4metaSchema);
  // @ts-expect-error TODO: capture ajv-validator/ajv issue(https://github.com/ajv-validator/ajv/issues/1253)
  ajv._opts.defaultMeta = v4metaSchema.id;
  const validate = ajv.compile(jsonSchema);
  const valid = validate(manifestJson);
  return {
    valid,
    errors: validate.errors,
    formattedErrorMessage: validate.errors
      ?.map((err) => `Error: '${err.dataPath}' ${err.message}`)
      .join("\n"),
  };
};

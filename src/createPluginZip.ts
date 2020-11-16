import { GaroonPluginManifestJson } from "../types/manifest-schema";
import path from "path";
import colors from "colors";
import { ZipFile } from "yazl";
import streamBuffers from "stream-buffers";
import { generateSourceListFromManifest } from "./generateSourceListFromManifest";
import { PackerOptions } from "./packer";

export const createPluginZip = (
  pluginDir: string,
  manifestJson: GaroonPluginManifestJson,
  options: PackerOptions = {}
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const output = new streamBuffers.WritableStreamBuffer();
    const zipFile = new ZipFile();

    output.on("finish", () => {
      const buffer = output.getContents() as Buffer;
      console.log(
        colors.blue(
          `Info: ${options.out ? path.basename(options.out) : "plugin.zip"} ${
            buffer.length
          } bytes`
        )
      );
      resolve(buffer);
    });

    zipFile.outputStream.pipe(output);

    generateSourceListFromManifest(manifestJson).forEach((filePath: string) => {
      zipFile.addFile(path.join(pluginDir, filePath), filePath);
    });

    zipFile.end();
  });
};

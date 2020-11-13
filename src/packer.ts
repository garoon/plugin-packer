import { GaroonPluginManifestJson } from "../types/manifest-schema";
import path from "path";
import { ZipFile } from "yazl";
import streamBuffers from "stream-buffers";
import { sourceListForPackage } from "./sourcelist";

export const createPluginZip = (
  pluginDir: string,
  manifestJson: GaroonPluginManifestJson
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const output = new streamBuffers.WritableStreamBuffer();
    const zipFile = new ZipFile();

    output.on("finish", () => {
      const buffer = output.getContents() as Buffer;
      console.log(`plugin.zip: ${buffer.length} bytes`);
      resolve(buffer);
    });

    zipFile.outputStream.pipe(output);

    sourceListForPackage(manifestJson).forEach((filePath: string) => {
      zipFile.addFile(path.join(pluginDir, filePath), filePath);
    });

    zipFile.end();
  });
};

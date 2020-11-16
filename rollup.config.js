/* eslint node/no-unpublished-import: 0 */
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import packageJson from "./package.json";

export default [
  {
    input: "src/packer.ts",
    output: {
      name: "garoon-plugin-packer",
      file: "dist/garoon-plugin-packer.js",
      format: "cjs",
      sourcemap: "inline",
      exports: "named",
    },
    external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
    plugins: [
      json(),
      resolve(),
      typescript(),
      commonjs({
        extensions: [".ts", ".js"],
      }),
    ],
  },
  {
    input: "src/cli.ts",
    output: {
      name: "garoon-plugin-packer-cli",
      file: "dist/garoon-plugin-packer-cli.js",
      format: "cjs",
      exports: "named",
    },
    external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
    plugins: [
      json(),
      resolve(),
      typescript(),
      commonjs({
        extensions: [".ts", ".js"],
      }),
    ],
  },
];

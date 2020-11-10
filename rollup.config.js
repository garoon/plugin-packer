import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import packageJson from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [{
      name: 'garoon-plugin-packer',
      file: "dist/garoon-plugin-packer.js",
      format: "cjs",
      sourcemap: 'inline'
    }],
    external: [...Object.keys(packageJson.devDependencies || {})],
    plugins: [
      resolve(),
      typescript(),
      commonjs({
        extensions: ['.ts', '.js']
      })
    ]
  }
]

garoon-plugin-packer
====

plugin-packer for Garoon plugins.

It's written in pure JavaScript, so

- The CLI works with Node.js in Mac/Windows/Linux
- Validate your manifest.json with JSON Schema

# How to install

```shell script
$ npm install -g @garoon/plugin-packer
```

# Usage: CLI

```shell script
$ garoon-plugin-packer [OPTIONS] PLUGIN_DIR
```

## Options

- `--out PLUGIN_FILE`: The path of generated plugin file. The default is `plugin.zip` in the same directory of PLUGIN_DIR.

## How to use with `npm run`

The plugin directory is ./plugin, edit package.json:

```json
{
  "scripts": {
    "package": "garoon-plugin-packer plugin"
  }
}
```

and then

```shell script
$ npm run package
```

# Usage: Node.js API

```js
const { packer } = require("@garoon/plugin-packer");

packer("./pluginDir");
```

## Licence

MIT License

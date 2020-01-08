# FirstSpirit-Support for VS Code

## Build / Sideload

### System-Setup

1. `nodejs` (npm) is needed. Install it if you do not have it already.
2. `npm install -g yarn` to make sure you have yarn installed globally (You could build without it, but my scripts depend on it..)
3. `npm install -g vsce` to make sure you have vsce installed globally

### Clone and build
2. `https://github.com/nils-a/vscode-firstspirit.git` to clone the repo if you havent already done so
3. build using `cake`:
   * on `linux` call `./build/build.sh`
   * on `windows` call `.\build\build.ps1`
   
### install / sideload

Open VS Code Run the command Extensions: Install from VSIX..., choose the vsix file from the `bin`-folder


## fs-lang
This extension adds FirstSpirit Templating-Language support.

## TODO
in no particular order:

 * better highlighting, auto-complete

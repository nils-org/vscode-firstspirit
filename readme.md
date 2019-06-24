# FirstSpirit-Support for VS Code

## Build / Sideload

1. `npm install -g vsce` to make sure you have vsce installed globally
2. `https://github.com/nils-a/vscode-firstspirit.git` to clone the repo if you havent already done so
3. `cd vscode-firstspirit/src/fs-lang`
4. `npm install` to install dependencies if you havent already done so
5. `vsce package` to build the package. This will generate a file with extension vsix
6. Run the command Extensions: Install from VSIX..., choose the vsix file generated in the previous step


## fs-lang
This extension adds FirstSpirit Templating-Language support.
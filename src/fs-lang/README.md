## FirstSpirit for Visual Studio Code

![GitHub](https://img.shields.io/github/license/nils-a/vscode-firstspirit.svg) ![Azure DevOps builds](https://img.shields.io/azure-devops/build/nils-andresen/10aa4f78-64ea-4ea1-888b-c7bd518743a5/2.svg) [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/nilsa.fs-lang.svg)](https://marketplace.visualstudio.com/items?itemName=nilsa.fs-lang) [![Installs](https://vsmarketplacebadge.apphb.com/installs-short/nilsa.fs-lang.svg)](https://marketplace.visualstudio.com/items?itemName=nilsa.fs-lang)

The FirstSpirit extension for Visual Studio Code provides the following features inside VS Code:

* Syntax-Highlighting of FirstSpirit template-tags
* Code-Snippets
* Code-Folding

### Get Started 

#### Switch to FirstSpirit highlighting
* Using the shortcut for language mode (`Cmd+K M` or `Ctrl+K M`), type `fs`, select `FirstSpirit (fs)`
* Using the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) then select `Change Language Mode`, type `fs`, select `FirstSpirit (fs)`
* Using the language mode switcher at the bottom right of VS Code, type `fs`, select `FirstSpirit (fs)`

#### Switch back from FirstSpirit highlighting
* Using the shortcut for language mode (`Cmd+K M` or `Ctrl+K M`), select `Auto Detect`
* Using the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) then select `Change Language Mode`, select `Auto Detect`
* Using the language mode switcher at the bottom right of VS Code, select `Auto Detect`.

#### Why is FirstSpirit not auto-detected
Well, there is no FirstSpirit file-type, is there? 

The files are always "something" like `html` (with FS-templating) or `XML` (with FS-templating) or `fop` (with FS-templating).
There's always some "content" and that is what's auto-detected (mostly depending on file-extensions). This way you can easily switch from content to templating.


### What's to come

* Hover/Tooltips/Signature-Help
* Auto-complete
* support for external sychronization
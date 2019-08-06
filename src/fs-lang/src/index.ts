import { ExtensionContext,languages } from "vscode";

import { FsHoverProvider } from "./hoverProvider"

export function activate(context: ExtensionContext): void {
    console.log("FS-Extension is activated!");

    context.subscriptions.push(languages.registerHoverProvider("fs", new FsHoverProvider));
}
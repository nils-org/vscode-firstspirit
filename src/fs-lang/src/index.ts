import { ExtensionContext,languages } from "vscode";
import { FsFoldingProvider } from "./foldingProvider"

export function activate(context: ExtensionContext): void {
    context.subscriptions.push(languages.registerFoldingRangeProvider("fs", new FsFoldingProvider));
}
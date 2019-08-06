import { 
    HoverProvider,
    TextDocument,
    Position,
    CancellationToken,
    ProviderResult,
    Hover } from 'vscode';

export class FsHoverProvider implements HoverProvider {

    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        const text = document.lineAt(position);
        const hoverMarkdown = `## FS-Hover
you hovered over line ${text.lineNumber + 1}:

     ${text.text}

        `;

        return new Hover(hoverMarkdown);
    }

}
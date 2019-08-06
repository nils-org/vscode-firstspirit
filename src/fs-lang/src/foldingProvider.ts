import { 
    FoldingRangeProvider,
    TextDocument,
    FoldingContext,
    CancellationToken,
    ProviderResult,
    FoldingRange } from 'vscode';

export class FsFoldingProvider implements FoldingRangeProvider {
    provideFoldingRanges(document: TextDocument, context: FoldingContext, token: CancellationToken): ProviderResult<FoldingRange[]> {
        if(token.isCancellationRequested){
            return null;
        }

        // Test: Immer drei Zeilen falten:
        const folds = Math.floor(document.lineCount / 3);
        const ranges:FoldingRange[] = [];

        for(let i =0; i<folds; i++){
            let start = i * 3;
            let end = start + 2;

            ranges.push(new FoldingRange(start, end));
        }

        return ranges;
    }
}
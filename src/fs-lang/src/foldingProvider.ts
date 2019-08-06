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

        const startExpression = new RegExp("^.*\\$CMS_(?!END)[^\\$]+\\$.*$");
        const endExpression = new RegExp("^.*\\$CMS_END_[^\\$]+\\$.*$");
        const ranges:FoldingRange[] = [];
        let foldingStartLine = -1;

        for(let i =0; i<document.lineCount; i++){
            let line = document.lineAt(i).text;
            if(foldingStartLine < 0 && startExpression.test(line)){
                // set start-marker
                foldingStartLine = i;
            } else if(endExpression.test(line)){
                // push fold & reset start-marker
                ranges.push(new FoldingRange(foldingStartLine, i));
                foldingStartLine = -1;
            }
        }

        return ranges;
    }
}
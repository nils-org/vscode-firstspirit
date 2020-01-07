import { 
    FoldingRangeProvider,
    TextDocument,
    FoldingContext,
    CancellationToken,
    ProviderResult,
    FoldingRange } from 'vscode';

interface IFoldingPair {
    from: RegExp;
    to: RegExp;
}

interface IFoldingPairHit {
    line: number;
    pair: IFoldingPair;
}


export class FsFoldingProvider implements FoldingRangeProvider {

    private foldingPairs: IFoldingPair[] = [
        { from: new RegExp("\\$CMS_FOR\\(", "i"), to: new RegExp("\\$CMS_END_FOR\\$", "i") },
        { from: new RegExp("\\$CMS_SET\\([^,]+\\)", "i"), to: new RegExp("\\$CMS_END_SET\\$", "i") }, 
        { from: new RegExp("\\$CMS_IF\\(", "i"),  to: new RegExp("\\$CMS_END_IF\\$", "i") },
        { from: new RegExp("\\$CMS_TRIM\\(", "i"),  to: new RegExp("\\$CMS_END_TRIM\\$", "i") },
        { from: new RegExp("\\$CMS_SWITCH\\(", "i"), to: new RegExp("\\$CMS_END_SWITCH\\$", "i") }
    ];

    provideFoldingRanges(document: TextDocument, context: FoldingContext, token: CancellationToken): ProviderResult<FoldingRange[]> {
        const ranges:FoldingRange[] = [];
        const foldStack:IFoldingPairHit[] = [];

        for(let i =0; i<document.lineCount; i++) {
            if(token.isCancellationRequested){
                return null;
            }

            let line = document.lineAt(i).text;
            let startHit:IFoldingPairHit|null=null;
            let startHitAt:number=-1;

            this.foldingPairs.forEach((p, n) => {
                const startIdx = line.search(p.from);
                const endIdx = line.search(p.to);
                if(startIdx >= 0 && endIdx >= 0 && startIdx < endIdx){
                    return; // can not fold "in" a line
                }

                if(startIdx >= 0) {
                    if(startIdx < startHitAt || startHitAt < 0){
                        startHit = {
                            pair: p,
                            line: i
                        }
                        startHitAt = startIdx
                    }
                }

                if(endIdx >= 0 && foldStack.length > 0){
                    // found an end - compare it to the top of the stack
                    let topStart:IFoldingPairHit = foldStack.pop()!;
                    if(topStart.pair.from === p.from) {
                        // we have a match
                        ranges.push(new FoldingRange(topStart.line, i));
                    } else {
                        // ignore - put top back on stack.
                        foldStack.push(topStart);
                    }

                }
            });

            if(startHit !== null){
                foldStack.push(startHit!);
            }
        }

        return ranges;
    }
}
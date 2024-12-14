import * as fs from 'fs';

const filePath = './src/2024/day-3/input.txt';

function hasInvalidChars(str: string) : boolean{
    return /[^0-9,]/.test(str);
}

export function day3() : void {
    try {
        const mulStr: string = "mul(";
        const data: string = fs.readFileSync(filePath, 'utf8');
        let total: number = 0;
        let regex = /mul\(/gi, result, indices = [];

        while ( (result = regex.exec(data)) ) {
            indices.push(result.index);
        }

        for (let i = 0; i < indices.length; i++) {
            let index = indices[i] + mulStr.length;
            let evaluation = data.slice(index, index + 8);
            if (!evaluation.includes(")")) {
                continue;
            }   

            let closingIndex = evaluation.indexOf(")");
            evaluation = evaluation.slice(0, closingIndex);
            if (hasInvalidChars(evaluation)) {
                continue;
            }

            let commaIndex = evaluation.indexOf(",");
            let firstNum = Number(evaluation.slice(0, commaIndex));
            let secondNum = Number(evaluation.slice(commaIndex + 1, closingIndex));
            total += (firstNum * secondNum)
        }

        console.log("Total:", total);
    } catch (err) {
        console.error('Something broke:', err);
    }

    day3_part2();
}

export function day3_part2() : void {
    try {

        const mulStr: string = "mul(";
        const data: string = fs.readFileSync(filePath, 'utf8');
        let total: number = 0;
        let regex = /mul\(/gi, result, indices = [];

        while ( (result = regex.exec(data)) ) {
            indices.push(result.index);
        }

        for (let i = 0; i < indices.length; i++) {
            // for this all we need to do is back scan from the
            // current index and find either a do or a don't
            // and then stop or continue the function from there
            let shouldRun: boolean = true;

            let index = indices[i] + mulStr.length;
            let evaluation = data.slice(index, index + 8);
            if (!evaluation.includes(")")) {
                continue;
            }   

            let closingIndex = evaluation.indexOf(")");
            evaluation = evaluation.slice(0, closingIndex);
            if (hasInvalidChars(evaluation)) {
                continue;
            }

            let commaIndex = evaluation.indexOf(",");
            let firstNum = Number(evaluation.slice(0, commaIndex));
            let secondNum = Number(evaluation.slice(commaIndex + 1, closingIndex));

            for (let k = indices[i]; k >= 0; k--) {
                // starting from the m in our mul, start going backwards until we find
                // a d, then do a scan for whether or not it's a do or a don't
                if (data[k] == "d") {
                    let query = data.slice(k, k + 7);
                    
                    if (query.match("don't()")) {
                        shouldRun = false;
                        break;
                    }

                    if (query.slice(0, 4) == "do()") {
                        shouldRun = true;
                        break;
                    }
                }
            }

            if (shouldRun) {
                total += (firstNum * secondNum)
            }
        }

        console.log("Total:", total);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}
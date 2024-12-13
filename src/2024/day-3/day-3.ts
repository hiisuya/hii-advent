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
            // at the VERY most, an entire mul formula can be
            // 8 characters long, ending at the closing )
            // to determine if this is a valid formula
            // we need to scan those 8 characters
            // if there is a ) then we take the first one
            // and split into a smaller string there
            // then determine if there is anything in there
            // that is not a number or a comma. if so, the mul is incorrent
            // then we need to check the distance from the ) to the ,
            // that will be the our second number
            // we then check from the , to the ( and that will be our first
            // number. That should give us everything we need

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
        console.error('Error reading file:', err);
    }
}
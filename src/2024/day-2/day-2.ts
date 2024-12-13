import * as fs from 'fs';

const filePath = './src/2024/day-2/input.txt';

export function day2() : void {
    try {
        const data: string = fs.readFileSync(filePath, 'utf8');
        let reportSafe: Array<boolean> = [];

        for (const report of data.split(/[\r\n]+/)) {
            let levels: Array<number> = report.split(" ").map(Number);
            let safe: boolean = true;
            let descending: boolean = false;

            if (levels.length <= 1) {
                continue;
            }

            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i + 1] < levels[i]) {
                    descending = true;
                    break;
                } else if (levels[i + 1] > levels[i]) {
                    descending = false;
                    break;
                }
            }

            // The levels are either all increasing or all decreasing.
            // Any two adjacent levels differ by at least one and at most three.
            for (let i = 0; i < levels.length - 1; i++) {
                let diff: number = Math.abs(levels[i] - levels[i + 1]);
                if ((levels[i + 1] > levels[i] && descending) 
                    || (levels[i + 1] < levels[i] && !descending) 
                    || (levels[i] == levels[i + 1])
                    || (diff < 1 || diff > 3)
                ) {
                    safe = false;
                    break;
                }
            }

            if (safe) {
                reportSafe.push(true);
            }
        }
        console.log(reportSafe.length);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}
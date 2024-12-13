import * as fs from 'fs';

const filePath = './src/2024/day-1/input.txt';

export function day1() : void {
    try {
        const data: string = fs.readFileSync(filePath, 'utf8');

        var left: Array<number> = [];
        var right: Array<number> = [];
        var dist: Array<number> = [];
        for (const line of data.split(/[\r\n]+/)){
            left.push(Number(line.substring(0, 5)));
            right.push(Number(line.substring(8)));
        }

        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);

        for (let i = 0; i < left.length; i++) {
            dist[i] = Math.abs(left[i] - right[i]);
        }

        const sum: number = dist.reduce((a, b) => a + b, 0);
        console.log(sum);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

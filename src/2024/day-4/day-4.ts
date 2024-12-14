import * as fs from 'fs';

const filePath = './src/2024/day-4/input.txt';

enum Direction {
    UP = 0,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT,
    MAX
};

const sLetters = ["X", "M", "A", "S"];
function checkDirection(dir: Direction, data: Array<string>, pos: number, col: number) : boolean {
    let i = 0;
    switch (dir) {
        case Direction.UP:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col - i][pos]) {
                    return false;
                }
            }
            break;
        case Direction.UP_RIGHT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col - i][pos + i]) {
                    return false;
                }
            }
            break;
        case Direction.RIGHT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col][pos + i]) {
                    return false;
                }
            }
            break;
        case Direction.DOWN_RIGHT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col + i][pos + i]) {
                    return false;
                }
            }
            break;
        case Direction.DOWN:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col + i][pos]) {
                    return false;
                }
            }
            break;
        case Direction.DOWN_LEFT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col + i][pos - i]) {
                    return false;
                }
            }
            break;
        case Direction.LEFT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col][pos - i]) {
                    return false;
                }
            }
            break;
        case Direction.UP_LEFT:
            for (i = 0; i < sLetters.length; i++) {
                if (sLetters[i] != data[col - i][pos - i]) {
                    return false;
                }
            }
            break;
        default:
            return false;
    }

    return true;
}

const MIN_DIST = 3;
const MAX_DIST = 136;
export function day4() : void {
    try {
        const data: string = fs.readFileSync(filePath, 'utf8');
        const dataArray = data.split(/[\r\n]+/);
        const columns = dataArray.length;
        const rowLength = dataArray[0].length;

        let total = 0;
        for (let col = 0; col < columns; col++) {
            for (let pos = 0; pos < rowLength; pos++) {
                if (dataArray[col][pos] == "X") {
                    for (let k = 0; k < Direction.MAX; k++) {
                        if (   (col < MIN_DIST && (k == Direction.UP || k == Direction.UP_RIGHT || k == Direction.UP_LEFT))
                            || (col > MAX_DIST && (k == Direction.DOWN || k == Direction.DOWN_RIGHT || k == Direction.DOWN_LEFT))
                            || (pos < MIN_DIST && (k == Direction.LEFT || k == Direction.UP_LEFT || k == Direction.DOWN_LEFT))
                            || (pos > MAX_DIST && (k == Direction.RIGHT || k == Direction.UP_RIGHT || k == Direction.DOWN_RIGHT))
                        ) {
                            continue;
                        }

                        if (checkDirection(k, dataArray, pos, col)) {
                            total++;
                        }
                    }
                }
            }
        }   
        console.log(total);
    } catch (err) {
        console.log("Something broke:", err);
    }
}

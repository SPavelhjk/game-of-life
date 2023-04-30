const createMinimizedPattern = (rows, cols, pattern) => {
    const middleRow = Math.floor(rows / 2);
    const middleCol = Math.floor(cols / 2);
    const output = [];
    for (const [a, b] of pattern) {
        output.push([middleRow + a, middleCol + b]);
    }
    return output;
};
const Pattern = {
    hwss: [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [3, 6], [4, 4], [4, 3], [3, 1]],
    mwss: [
        [0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [3, 5], [4, 3], [3, 1]
    ],
    hammerheadspaceship: [
        [0, 0], [1, 0], [2, 0], [3, 1], [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [4, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 7], [6, 8], [9, 8], [5, 10], [11, 8], [11, 9], [10, 10], [9, 10], [11, 11], [11, 12], [12, 12], [12, 11], [3, 11], [3, 12], [9, 6], [10, 5], [11, 4], [11, 3], [12, 1], [13, 0], [14, 0], [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [14, 5], [13, 12], [13, 13], [14, 13], [14, 14], [12, 14], [11, 15], [12, 15], [13, 15], [11, 16], [12, 16], [13, 16], [12, 17], [13, 17], [6, 10], [4, 9], [4, 8], [4, 11], [4, 12], [2, 12], [2, 13], [1, 13], [1, 14], [3, 14], [3, 15], [2, 15], [2, 16], [4, 15], [4, 16], [3, 16], [2, 17], [3, 17], [5, 13], [6, 12], [10, 13], [9, 12]
    ],
    boat: [
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1],
        [2, 2]
    ],
    block: [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ],
    beeHive: [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 3],
        [2, 1],
        [2, 2]
    ],
    loaf: [
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 3],
        [2, 1],
        [3, 2],
        [2, 3]
    ],
    tub: [
        [0, 1],
        [1, 0],
        [2, 1],
        [1, 2]
    ]
};
const PATTERNS = [
    {
        name: 'hwss',
        label: 'Heavy-weight spaceship (MWSS)',
        pattern: Pattern.hwss,
        minimizedPattern: createMinimizedPattern(4, 10, Pattern.hwss),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'mwss',
        label: 'Middle-weight spaceship (MWSS)',
        pattern: Pattern.mwss,
        minimizedPattern: createMinimizedPattern(4, 10, Pattern.mwss),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'hammerheadspaceship',
        label: 'Habberhead (Spaceship)',
        pattern: Pattern.hammerheadspaceship,
        minimizedPattern: createMinimizedPattern(2, 2, Pattern.hammerheadspaceship),
        rows: 18,
        cols: 20,
        cellSize: 12
    },
    {
        name: 'boat',
        label: 'Boat',
        pattern: Pattern.boat,
        minimizedPattern: createMinimizedPattern(6, 14, Pattern.boat),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'block',
        label: 'Block',
        pattern: Pattern.block,
        minimizedPattern: createMinimizedPattern(6, 15, Pattern.block),
        rows: 8,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'beeHive',
        label: 'Bee hive',
        pattern: Pattern.beeHive,
        minimizedPattern: createMinimizedPattern(6, 12, Pattern.beeHive),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'loaf',
        label: 'Loaf',
        pattern: Pattern.loaf,
        minimizedPattern: createMinimizedPattern(6, 12, Pattern.loaf),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
    {
        name: 'tub',
        label: 'Tub',
        pattern: Pattern.tub,
        minimizedPattern: createMinimizedPattern(6, 13, Pattern.tub),
        rows: 9,
        cols: 15,
        cellSize: 16
    },
];
export default PATTERNS;

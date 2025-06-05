import type { Maze } from './types';

export const maze: Record<string, Maze> = {
    maze_p1: {
        matrix: [
            [0, 0, 0, 0, 0, 0, 0],
            [18, 18, 25, 10, 0, 0, 0],
            [0, 0, 0, 4, 10, 24, 21],
            [0, 0, 0, 0, 0, 0, 12],
            [0, 0, 0, 0, 0, 0, 8]
        ],
        initialPosition: { x: 6, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 1 },
        targetResult: 150,
        type:'maze'
    },
    maze_p2: {
        matrix: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 25, 10, 24, 18, 12],
            [8, 24, 15, 0, 0, 0, 0],
            [21, 0, 0, 0, 0, 0, 0],
            [18, 0, 0, 0, 0, 0, 0]
        ],
        initialPosition: { x: 0, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 6 },
        targetResult: 150,
        type:'maze'
    },
    maze_p3: {
        matrix: [
            [0, 0, 0, 12, 0, 0, 0],
            [56, 4, 10, 9, 0, 0, 0],
            [5, 0, 0, 0, 0, 0, 0],
            [12, 48, 0, 0, 0, 0, 0],
            [0, 14, 0, 0, 0, 0, 0]
        ],
        initialPosition: { x: 1, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 3, y: 0 },
        targetResult: 170,
        type:'maze'
    },
    maze_p4: {
        matrix: [
            [0, 0, 0, 9, 0, 0, 0],
            [0, 0, 0, 9, 8, 24, 7],
            [0, 0, 0, 0, 0, 0, 20],
            [0, 0, 0, 0, 0, 24, 63],
            [0, 0, 0, 0, 0, 6, 0]
        ],
        initialPosition: { x: 5, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 3, y: 0 },
        targetResult: 170,
        type:'maze'
    },
    maze_p5: {
        matrix: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 56, 9, 2, 30, 10],
            [0, 0, 30, 0, 0, 0, 0],
            [0, 8, 12, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0]
        ],
        initialPosition: { x: 1, y: 4 },
        initialOrientation: 'east',
        targetPosition: { x: 6, y: 1 },
        targetResult: 160,
        type:'maze'
    },
    maze_p6: {
        matrix: [
            [0, 0, 0, 0, 0, 0, 0],
            [10, 15, 14, 56, 9, 0, 0],
            [0, 0, 0, 0, 30, 0, 0],
            [0, 0, 0, 0, 12, 8, 0],
            [0, 0, 0, 0, 0, 4, 2]
        ],
        initialPosition: { x: 6, y: 4 },
        initialOrientation: 'west',
        targetPosition: { x: 0, y: 1 },
        targetResult: 160,
        type:'maze'
    }
};

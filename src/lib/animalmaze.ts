import type { Animals } from "./types";

export const animalmaze: Record<string, Animals> = {
    habitat_p: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 0 },
        nonTargetPositions: [ { x: 2, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 0 }],
        type: 'animalmaze'
    },

    habitat_t: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 0 },
        nonTargetPositions: [ { x: 2, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 0 }],
        type: 'animalmaze'
    },

    habitat_b: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 0 },
        nonTargetPositions: [ { x: 2, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 0 }],
        type: 'animalmaze'
    },

    habitat_u: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 2, y: 0 },
        nonTargetPositions: [ { x: 0, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 0 }],
        type: 'animalmaze'
    },

    habitat_v: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 6, y: 0 },
        nonTargetPositions: [ { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }],
        type: 'animalmaze'
    },

    habitat_e: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 4, y: 0 },
        nonTargetPositions: [ { x: 0, y: 0 }, { x: 6, y: 0 }, { x: 2, y: 0 }],
        type: 'animalmaze'
    },

    fur_p: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 5 },
        nonTargetPositions: [{ x: 1, y: 1 }],
        type: 'animalmaze'
    },

    fur_t: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 5 },
        nonTargetPositions: [ { x: 1, y: 1 }],
        type: 'animalmaze'
    },

    fur_b: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 1 },
        nonTargetPositions: [{x: 1, y: 5}],
        type: 'animalmaze'
    },

    fur_u: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 1 },
        nonTargetPositions: [{x: 1, y: 5}],
        type: 'animalmaze'
    },

    fur_v: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 1 },
        nonTargetPositions: [{x: 1, y: 5}],
        type: 'animalmaze'
    },

    fur_e: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 1, y: 1 },
        nonTargetPositions: [{x: 1, y: 5}],
        type: 'animalmaze'
    },

    food_p: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 2 },
        nonTargetPositions: [ { x: 4, y: 2 }, { x: 6, y: 2 }],
        type: 'animalmaze'
    },

    food_t: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 4, y: 2 },
        nonTargetPositions: [ { x: 0, y: 2 }, { x: 6, y: 2 }],
        type: 'animalmaze'
    },

    food_b: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 2},
        nonTargetPositions: [{ x: 4, y: 2 }, { x: 6, y: 2 }],
        type: 'animalmaze'
    },

    food_u: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 0, y: 2 },
        nonTargetPositions: [{ x: 4, y: 2 }, { x: 6, y: 2 }],
        type: 'animalmaze'
    },

    food_v: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 6, y: 2 },
        nonTargetPositions: [{ x: 4, y: 2 }, { x: 0, y: 2 }],
        type: 'animalmaze'
    },

    food_e: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        initialPosition: { x: 3, y: 4 },
        initialOrientation: 'north',
        targetPosition: { x: 6, y: 2 },
        nonTargetPositions: [{ x: 4, y: 2 }, { x: 0, y: 2 }],
        type: 'animalmaze'
    }

}

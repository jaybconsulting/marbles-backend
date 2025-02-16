import { shorthands as userShorthands } from './1739505882069_add-picture-to-users.js';

export const shorthands = {
    ...userShorthands,
};

export const up = (pgm) => {
    pgm.createTable('game_results', {
        id: 'id',
        winningPlayer1: shorthands.userId,
        winningPlayer2: shorthands.userId,
        losingPlayer1: shorthands.userId,
        losingPlayer2: shorthands.userId,
        createdAt: {
            ...shorthands.createdAt,
            default: pgm.func('current_timestamp'),
        },
    });
};

export const down = (pgm) => {
    pgm.dropTable('game_results');
};

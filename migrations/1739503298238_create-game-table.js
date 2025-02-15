import { shorthands as usersShorthands } from './1739502640376_create-friends-table.js';

export const shorthands = {
    ...usersShorthands,
    hand: {
        type: 'json',
        notNull: true
    },
    marbles: {
        type: 'json',
        notNull: true
    },
};

export const up = (pgm) => {
    pgm.createType('game_status', [
        'not_started',
        'in_progress',
        'finished',
        'cancelled'
    ]);

    pgm.createTable('game', {
        id: 'id',
        gameStatus: {
            type: 'game_status',
            notNull: true
        },
        greenPlayerId: shorthands.userId,
        redPlayerId: shorthands.userId,
        bluePlayerId: shorthands.userId,
        yellowPlayerId: shorthands.userId,
        greenHand: shorthands.hand,
        redHand: shorthands.hand,
        blueHand: shorthands.hand,
        yellowHand: shorthands.hand,
        marbles: shorthands.marbles,
        createdAt: {
            ...shorthands.createdAt,
        },
    });
};

export const down = (pgm) => {
    pgm.dropTable('game');
    pgm.dropType('game_status');
};

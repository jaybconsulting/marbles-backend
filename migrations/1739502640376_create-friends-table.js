import { shorthands as usersShorthands } from './1739499652140_create-users-table.js';

export const shorthands = {
    ...usersShorthands,
    userId: {
        type: 'integer',
        notNull: true,
    },
};

export const up = (pgm) => {
    pgm.createTable('friends', {
        id: 'id',
        userIdA: shorthands.userId,
        userIdB: shorthands.userId,
        createdAt: {
            ...shorthands.createdAt,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            ...shorthands.updatedAt,
            default: pgm.func('current_timestamp'),
        },
    });
};

export const down = (pgm) => {
    pgm.dropTable('friends');
};

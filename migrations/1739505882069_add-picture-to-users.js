import { shorthands as usersShorthands } from './1739503298238_create-game-table.js';

export const shorthands = {
    ...usersShorthands,
};

export const up = (pgm) => {
    pgm.addColumn('users', {
        picture: {
            type: 'text',
        }
    });
};

export const down = (pgm) => {
    pgm.dropColumn('users', 'picture');
};

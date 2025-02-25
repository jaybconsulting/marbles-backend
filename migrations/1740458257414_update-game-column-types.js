import { shorthands as userShorthands } from './1740390410205_update-column-names.js';

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = {
    ...userShorthands,
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.alterColumn('game', 'green_hand', {
        notNull: false
    });
    pgm.alterColumn('game', 'red_hand', {
        notNull: false
    });
    pgm.alterColumn('game', 'blue_hand', {
        notNull: false
    });
    pgm.alterColumn('game', 'yellow_hand', {
        notNull: false
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.alterColumn('game', 'green_hand', {
        notNull: true
    });
    pgm.alterColumn('game', 'red_hand', {
        notNull: true
    });
    pgm.alterColumn('game', 'blue_hand', {
        notNull: true
    });
    pgm.alterColumn('game', 'yellow_hand', {
        notNull: true
    });
};

import { shorthands as userShorthands } from './1740458490600_update-game-marbles-column-type.js';

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
    pgm.alterColumn('game', 'created_at', {
        default: pgm.func('current_timestamp'),
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.alterColumn('game', 'created_at', {
        default: null,
    });
};

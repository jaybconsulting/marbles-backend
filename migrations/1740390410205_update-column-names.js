import { shorthands as userShorthands } from './1739590652705_add-gameresults-table.js';

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
    pgm.renameColumn('friends', 'userIdA', 'user_id_a');
    pgm.renameColumn('friends', 'userIdB', 'user_id_b');
    pgm.renameColumn('friends', 'createdAt', 'created_at');
    pgm.renameColumn('friends', 'updatedAt', 'updated_at');
    pgm.renameColumn('game', 'gameStatus', 'game_status');
    pgm.renameColumn('game', 'greenPlayerId', 'green_player_id');
    pgm.renameColumn('game', 'bluePlayerId', 'blue_player_id');
    pgm.renameColumn('game', 'redPlayerId', 'red_player_id');
    pgm.renameColumn('game', 'yellowPlayerId', 'yellow_player_id');
    pgm.renameColumn('game', 'greenHand', 'green_hand');
    pgm.renameColumn('game', 'blueHand', 'blue_hand');
    pgm.renameColumn('game', 'redHand', 'red_hand');
    pgm.renameColumn('game', 'yellowHand', 'yellow_hand');
    pgm.renameColumn('game', 'createdAt', 'created_at');
    pgm.renameColumn('game_results', 'winningPlayer1', 'winning_player_1');
    pgm.renameColumn('game_results', 'winningPlayer2', 'winning_player_2');
    pgm.renameColumn('game_results', 'losingPlayer1', 'losing_player_1');
    pgm.renameColumn('game_results', 'losingPlayer2', 'losing_player_2');
    pgm.renameColumn('game_results', 'createdAt', 'created_at');
    pgm.renameColumn('users', 'refreshToken', 'refresh_token');
    pgm.renameColumn('users', 'updatedAt', 'updated_at');
    pgm.renameColumn('users', 'firstName', 'first_name');
    pgm.renameColumn('users', 'lastName', 'last_name');
    pgm.renameColumn('users', 'createdAt', 'created_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.renameColumn('friends', 'user_id_a', 'userIdA');
    pgm.renameColumn('friends', 'user_id_b', 'userIdB');
    pgm.renameColumn('friends', 'created_at', 'createdAt');
    pgm.renameColumn('friends', 'updated_at', 'updatedAt');
    pgm.renameColumn('game', 'game_status', 'gameStatus');
    pgm.renameColumn('game', 'green_player_id', 'greenPlayerId');
    pgm.renameColumn('game', 'blue_player_id', 'bluePlayerId');
    pgm.renameColumn('game', 'red_player_id', 'redPlayerId');
    pgm.renameColumn('game', 'yellow_player_id', 'yellowPlayerId');
    pgm.renameColumn('game', 'green_hand', 'greenHand');
    pgm.renameColumn('game', 'blue_hand', 'blueHand');
    pgm.renameColumn('game', 'red_hand', 'redHand');
    pgm.renameColumn('game', 'yellow_hand', 'yellowHand');
    pgm.renameColumn('game', 'created_at', 'createdAt');
    pgm.renameColumn('game_results', 'winning_player_1', 'winningPlayer1');
    pgm.renameColumn('game_results', 'winning_player_2', 'winningPlayer2');
    pgm.renameColumn('game_results', 'losing_player_1', 'losingPlayer1');
    pgm.renameColumn('game_results', 'losing_player_2', 'losingPlayer2');
    pgm.renameColumn('game_results', 'created_at', 'createdAt');
    pgm.renameColumn('users', 'refresh_token', 'refreshToken');
    pgm.renameColumn('users', 'updated_at', 'updatedAt');
    pgm.renameColumn('users', 'first_name', 'firstName');
    pgm.renameColumn('users', 'last_name', 'lastName');
    pgm.renameColumn('users', 'created_at', 'createdAt');
};

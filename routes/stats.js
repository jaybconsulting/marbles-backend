import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const userEmail = req.auth.email;
    const user = await db.one('SELECT * FROM users WHERE email = $1', [userEmail]);
    const wins = await db.any(
        'SELECT * FROM game_results ' +
        'WHERE winning_player_1 = $1 OR winning_player_2 = $1',
        [user.id]
    );

    const losses = await db.any(
        'SELECT * FROM game_results ' +
        'WHERE losing_player_1 = $1 OR losing_player_2 = $1',
        [user.id]
    );

    res.json({
        wins: wins.length,
        losses: losses.length
    });
});

export default router;
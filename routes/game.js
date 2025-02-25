import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { playerIds } = req.body;

        console.log('playerIds', playerIds);
        
        const result = await db.query(
            `INSERT INTO game (green_player_id, blue_player_id, red_player_id, yellow_player_id, game_status)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [playerIds.green, playerIds.blue, playerIds.red, playerIds.yellow, 'not_started']
        );

        console.log('result', result);

        res.json({ gameId: result[0].id });
    } catch (error) {
        console.error('Error creating new game:', error);
        res.status(500).json({ error: 'Failed to create new game' });
    }
});

export default router;
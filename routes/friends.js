import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const userEmail = req.auth.email;
    const userId = await db.one('SELECT id FROM users WHERE email = $1', [userEmail]);
    const friends = await db.any(
        'SELECT id, first_name, last_name, picture FROM users ' +
        'WHERE id IN (SELECT user_id_a FROM friends WHERE user_id_b = $1) ' +
        'OR id IN (SELECT user_id_b FROM friends WHERE user_id_a = $1)',
        [userId.id]
    );
    res.json(friends);
});

export default router;
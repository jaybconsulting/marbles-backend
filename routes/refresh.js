import express from 'express';
import db from '../utils/db.js';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.get('/', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;

    const user = await db.oneOrNone('SELECT * FROM users WHERE "refreshToken" = $1', [refreshToken]);
    if (!user) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.email !== decoded.email) {
            console.log('Error: ', err);
            console.log('User: ', user);
            console.log('Decoded: ', decoded);
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            email: user.email,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });

        res.json({ 
            accessToken,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture
        });
    });
});

export default router;
import express from 'express';
import { verifyGoogleToken } from '../utils/authentication.js';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

const router = express.Router();

router.post('/',
    async (req, res) => {
        const payload = await verifyGoogleToken(req.body.credential);
        
        const user = await (async () => {
            const userInDB = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [payload.email]);

            if (!userInDB) {
                const refreshToken = jwt.sign(
                    {
                        email: payload.email,
                    }, 
                    process.env.REFRESH_TOKEN_SECRET, 
                    {
                        expiresIn: '365d'
                    });

                const createdUser = await db.one('INSERT INTO users (email, first_name, last_name, refresh_token, picture) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, refresh_token, picture', [payload.email, payload.given_name, payload.family_name, refreshToken, payload.picture]);
                console.log('Created user: ', createdUser);
                return createdUser;
            }

            return userInDB;
        })();

        const accessToken = jwt.sign({
                email: user.email,
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            });

        res.cookie('refreshToken', user.refresh_token, 
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 * 365
        });

        res.json({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            picture: user.picture,
            accessToken: accessToken
        });
    }
);

export default router;

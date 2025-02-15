import { OAuth2Client } from 'google-auth-library';

export async function verifyGoogleToken(token) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        return payload;
    }

    return verify().catch(err => {
        console.error('Google authentication error: ', err);
        throw err;
    });
}
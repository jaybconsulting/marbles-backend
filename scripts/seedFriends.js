import 'dotenv/config';
import db from '../utils/db.js';
import { faker } from '@faker-js/faker';

const CONNECTIONS_PER_USER = 3; // Average number of friends per user

async function seedFriends() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        console.log('Starting to seed friend connections...');

        // Get all users
        const users = await db.many('SELECT id FROM users');
        
        // Create random friendships
        for (const user of users) {
            // Get random number of connections for this user
            const numConnections = faker.number.int({ min: 1, max: CONNECTIONS_PER_USER });
            
            // Create array of other users to potentially connect with
            const potentialFriends = users.filter(u => u.id !== user.id);
            
            // Randomly select friends
            const selectedFriends = faker.helpers.shuffle(potentialFriends).slice(0, numConnections);
            
            // Process each friend connection sequentially
            for (const friend of selectedFriends) {
                try {
                    // Check if friendship already exists
                    const existingFriendship = await db.oneOrNone(
                        'SELECT * FROM friends WHERE (user_id_a = $1 AND user_id_b = $2) OR (user_id_a = $2 AND user_id_b = $1)',
                        [user.id, friend.id]
                    );

                    if (!existingFriendship) {
                        // Create single friendship row (always put smaller ID as user_id for consistency)
                        const [smallerId, largerId] = [user.id, friend.id].sort((a, b) => a - b);
                        await db.none(
                            'INSERT INTO friends (user_id_a, user_id_b) VALUES ($1, $2)',
                            [smallerId, largerId]
                        );
                        console.log(`Created friendship between users ${user.id} and ${friend.id}`);
                    }
                } catch (error) {
                    console.error(`Error creating friendship between ${user.id} and ${friend.id}:`, error);
                }
            }
        }

        console.log('Successfully seeded friend connections');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding friends:', error);
        process.exit(1);
    }
}

seedFriends(); 
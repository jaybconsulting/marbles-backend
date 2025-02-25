import 'dotenv/config';
import db from '../utils/db.js';
import { faker } from '@faker-js/faker';

async function seedGameResults() {
    try {
        // First, get all user IDs from the users table
        const users = await db.any('SELECT id FROM users');
        
        if (users.length < 4) {
            console.error('Need at least 4 users in the database to seed game results');
            process.exit(1);
        }

        // Function to get 4 random unique users
        function getFourRandomUsers(users) {
            const shuffled = [...users].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 4).map(user => user.id);
        }

        // Create 20 random game results
        const gameResults = [];
        for (let i = 0; i < 20; i++) {
            const [player1, player2, player3, player4] = getFourRandomUsers(users);
            gameResults.push({
                winningPlayer1: player1,
                winningPlayer2: player2,
                losingPlayer1: player3,
                losingPlayer2: player4
            });
        }

        // Insert the game results
        for (const result of gameResults) {
            await db.none(
                `INSERT INTO game_results 
                (winning_player_1, winning_player_2, losing_player_1, losing_player_2)
                VALUES ($1, $2, $3, $4)`,
                [
                    result.winningPlayer1,
                    result.winningPlayer2,
                    result.losingPlayer1,
                    result.losingPlayer2
                ]
            );
        }

        console.log('Successfully seeded game results table');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding game results:', error);
        process.exit(1);
    }
}

seedGameResults();
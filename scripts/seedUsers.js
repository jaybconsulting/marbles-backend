import 'dotenv/config';
import db from '../utils/db.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const NUM_USERS = 10; // Number of fake users to create

async function seedUsers() {
    try {
        // Add connection verification
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        console.log('Starting to seed users...');
        
        // Create users
        for (let i = 0; i < NUM_USERS; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName });
            const picture = faker.image.avatar();
            const refreshToken = faker.string.uuid();
            
            await db.none(
                'INSERT INTO users (email, "firstName", "lastName", picture, "refreshToken") VALUES ($1, $2, $3, $4, $5)',
                [email, firstName, lastName, picture, refreshToken]
            );
        }

        console.log(`Successfully created ${NUM_USERS} fake users`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
}

seedUsers(); 
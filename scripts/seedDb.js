async function seedDb() {
    await seedUsers();
    await seedFriends();
}

seedDb();
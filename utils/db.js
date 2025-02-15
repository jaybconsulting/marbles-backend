import pgp from 'pg-promise';

const db = pgp({
    capSQL: true
})(process.env.DATABASE_URL);

export default db;
export const shorthands = {
    email: {
        type: 'varchar(255)',
        notNull: true,
        unique: true,
    },
    firstName: {
        type: 'varchar(255)',
        notNull: true,
    },
    lastName: {
        type: 'varchar(255)',
        notNull: true,
    },
    refreshToken: {
        type: 'varchar(255)',
        notNull: true,
    },
    createdAt: {
        type: 'timestamp',
        notNull: true,
    },
    updatedAt: {
        type: 'timestamp',
        notNull: true,
    },
};

export const up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        email: shorthands.email,
        firstName: shorthands.firstName,
        lastName: shorthands.lastName,
        refreshToken: shorthands.refreshToken,
        createdAt: {
            ...shorthands.createdAt,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            ...shorthands.updatedAt,
            default: pgm.func('current_timestamp'),
        },
    });
};

export const down = (pgm) => {
    pgm.dropTable('users');
};

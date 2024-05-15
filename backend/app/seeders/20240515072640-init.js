'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    username: 'john_doe',
                    email: 'john@example.com',
                    password: 'hashed_password_123',
                    avatarId: '1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'jane_doe',
                    email: 'jane@example.com',
                    password: 'hashed_password_456',
                    avatarId: '2',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            'Tasks',
            [
                {
                    title: 'Task 1',
                    description: 'Description for Task 1',
                    status: 'To Do',
                    color: '#FF5733',
                    dueDate: new Date('2024-12-31'),
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Task 2',
                    description: 'Description for Task 2',
                    status: 'In Progress',
                    color: '#33FF57',
                    dueDate: new Date('2024-11-30'),
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Task 3',
                    description: 'Description for Task 3',
                    status: 'Done',
                    color: '#3357FF',
                    dueDate: new Date('2024-10-31'),
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Tasks', null, {});
    },
};

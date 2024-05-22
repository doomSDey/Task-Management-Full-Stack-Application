const request = require('supertest');
const app = require('../index');
const { User } = require('../app/models');
const bcrypt = require('bcryptjs');

describe('User Controller', () => {
    let user, token, server;

    beforeAll(async () => {
        server = app.listen(5000);
        await User.sync({ force: true });

        user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 8),
            avatarId: 'Avatar1',
        });

        const res = await request(server).post('/auth/signin').send({
            email: 'test@example.com',
            password: 'password123',
        });

        token = res.body.accessToken;
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /users/:userId', () => {
        it('should get a user by ID', async () => {
            const res = await request(server)
                .get(`/users/${user.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', user.id);
            expect(res.body).toHaveProperty('username', user.username);
            expect(res.body).toHaveProperty('email', user.email);
            expect(res.body).toHaveProperty('avatarId', user.avatarId);
        });

        it('should return 403 for forbidden access', async () => {
            const res = await request(server)
                .get(`/users/9999`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(403);
            expect(res.body).toHaveProperty('error', 'Forbidden');
        });
    });

    describe('PUT /users/avatar', () => {
        it('should update the user\'s avatar ID', async () => {
            const res = await request(server)
                .put('/users/avatar')
                .set('Authorization', `Bearer ${token}`)
                .send({ avatarId: 'Avatar2' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Avatar updated successfully');
            expect(res.body.user).toHaveProperty('avatarId', 'Avatar2');
        });

        it('should return 400 for missing avatarId', async () => {
            const res = await request(server)
                .put('/users/avatar')
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'avatarId is required');
        });

        it('should return 400 for invalid avatarId', async () => {
            const res = await request(server)
                .put('/users/avatar')
                .set('Authorization', `Bearer ${token}`)
                .send({ avatarId: 'InvalidAvatar' });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Invalid avatarId. Allowed values are Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6.');
        });

        it('should return 404 for non-existent user', async () => {
            await user.destroy(); // Destroy the user to simulate a non-existent user scenario

            const res = await request(server)
                .put('/users/avatar')
                .set('Authorization', `Bearer ${token}`)
                .send({ avatarId: 'Avatar1' });

            expect(res.statusCode).toEqual(404);
        });
    });
});

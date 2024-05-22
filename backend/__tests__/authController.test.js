const request = require('supertest');
const app = require('../index');
const { User } = require('../app/models');
const bcrypt = require('bcryptjs');

describe('Auth Controller', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(5000);
        await User.sync({ force: true }); 
    });

    afterAll(async () => {
        await server.close();
    });

    afterEach(async () => {
        await User.destroy({ where: {} }); 
    });

    describe('POST /auth/signup', () => {
        it('should sign up a new user', async () => {
            const res = await request(app).post('/auth/signup').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                avatarId: 'Avatar1',
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('accessToken');
        });
    });

    describe('POST /auth/signin', () => {
        it('should sign in a user', async () => {
            const hashedPassword = bcrypt.hashSync('password123', 8);
            const user = await User.create({
                username: 'testuser',
                email: 'test@example.com',
                password: hashedPassword,
                avatarId: 'Avatar1',
            });

            const res = await request(app).post('/auth/signin').send({
                email: 'test@example.com',
                password: 'password123',
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('accessToken');
        });

        it('should not sign in with incorrect password', async () => {
            const hashedPassword = bcrypt.hashSync('password123', 8);
            await User.create({
                username: 'testuser',
                email: 'test@example.com',
                password: hashedPassword,
                avatarId: 'Avatar1',
            });

            const res = await request(app).post('/auth/signin').send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Invalid email or password');
        });
    });
});

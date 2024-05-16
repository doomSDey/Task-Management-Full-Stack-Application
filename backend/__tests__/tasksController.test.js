const request = require('supertest');
const app = require('../index');
const { User, Task } = require('../app/models');
const bcrypt = require('bcryptjs');
const { beforeEach } = require('node:test');

describe('Tasks Controller', () => {
    let server, user, token, task;

    beforeAll(async () => {
        server = app.listen(4000);
        await User.sync({ force: true }); 
        await Task.sync({ force: true }); 

        user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 8),
            avatarId: 'Avatar1',
        });

        const res = await request(app).post('/auth/signin').send({
            email: 'test@example.com',
            password: 'password123',
        });

        token = res.body.accessToken;

        task = await Task.create({
            title: 'Test Task',
            description: 'Test Description',
            status: 'To Do',
            color: '#FFFFFF',
            userId: user.id,
        });
    });

    afterAll(async () => {
        await Task.destroy({ where: {} });
        await server.close();
    });

    describe('GET /tasks/:taskId', () => {
        it('should show a task', async () => {
            const res = await request(app)
                .get(`/tasks/${task.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', task.id);
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(app)
                .get('/tasks/999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('GET /tasks', () => {
        it('should get all tasks', async () => {
            const res = await request(server)
                .get('/tasks')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.tasks).toHaveLength(1);
        });

        it('should get tasks with filters', async () => {
            const res = await request(server)
                .get('/tasks')
                .query({ status: 'To Do', search: 'Test' })
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.tasks).toHaveLength(1);
        });

        it('should return paginated results', async () => {
            const res = await request(server)
                .get('/tasks')
                .query({ page: 1, limit: 1 })
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.tasks).toHaveLength(1);
            expect(res.body.totalItems).toBe(1);
            expect(res.body.totalPages).toBe(1);
            expect(res.body.currentPage).toBe(1);
        });
    });

    describe('GET /tasks/dueToday', () => {
        it('should get tasks due today', async () => {
            const res = await request(app)
                .get('/tasks/dueToday')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.any(Array));
        });
    });

    describe('POST /tasks/newTask', () => {
        it('should create a new task', async () => {
            const res = await request(app)
                .post('/tasks/newTask')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'New Task',
                    description: 'New Description',
                    status: 'In Progress',
                    color: '#000000',
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('title', 'New Task');
        });

        it('should return 400 for missing fields', async () => {
            const res = await request(app)
                .post('/tasks/newTask')
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe(
                'Title, description, status, and color are required fields.'
            );
        });
    });

    describe('PUT /tasks/:taskId', () => {
        it('should update a task', async () => {
            const res = await request(server)
                .put(`/tasks/${task.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Task',
                    description: 'Updated Description',
                    status: 'Done',
                    color: '#ffffff',
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toBe('Updated Task');
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(server)
                .put('/tasks/999')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Task',
                    description: 'Updated Description',
                    status: 'Done',
                    color: '#ffffff',
                });

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toBe('Task not found');
        });
    });

    describe('DELETE /tasks/:taskId', () => {
        it('should delete a task', async () => {
            const res = await request(server)
                .delete(`/tasks/${task.id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Task deleted successfully');
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(server)
                .delete('/tasks/999')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toBe('Task not found');
        });
    });
});

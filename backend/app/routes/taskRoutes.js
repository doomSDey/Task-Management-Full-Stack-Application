/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

const { authorizeJwt } = require('../middleware');
const tasksController = require('../controllers').tasks;
const router = require('express').Router();

router.get('/:taskId', [authorizeJwt.verifyToken], tasksController.show);
router.post('/tasks', [authorizeJwt.verifyToken], tasksController.create);

module.exports = router;

const { authorizeJwt } = require('../middleware');
const tasksController = require('../controllers').tasks;
const router = require('express').Router();

router.get('/:taskId', [authorizeJwt.verifyToken], tasksController.show);
router.post('/tasks', [authorizeJwt.verifyToken], tasksController.create);

module.exports = router;

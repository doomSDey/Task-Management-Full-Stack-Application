const { authorizeJwt } = require('../middleware');
const tasksController = require('../controllers').tasks;
const router = require('express').Router();

router.get('/:taskId', [authorizeJwt.verifyToken], tasksController.show);
router.get('', [authorizeJwt.verifyToken], tasksController.getAllTasks);
router.post('/newTask', [authorizeJwt.verifyToken], tasksController.create);
router.put('/:taskId', [authorizeJwt.verifyToken], tasksController.update);
router.delete('/:taskId', [authorizeJwt.verifyToken], tasksController.delete);

module.exports = router;

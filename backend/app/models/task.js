'use strict';
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *         - color
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           description: The status of the task
 *         color:
 *           type: string
 *           description: The color of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *       example:
 *         id: 1
 *         title: Sample Task
 *         description: This is a sample task
 *         status: To Do
 *         color: "#FF5733"
 *         dueDate: "2024-12-31"
 */

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association here
            Task.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
        }
    }
    Task.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false, // Title must not be null
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false, // Description must not be null
            },
            status: {
                type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
                allowNull: false, // Status must not be null
            },
            color: {
                type: DataTypes.STRING, // Hex code for color
                allowNull: false, // Color can be null
            },
            dueData: DataTypes.DATE, // Optional DATE field for dueData
        },
        {
            sequelize,
            modelName: 'Task',
            timestamps: true,
        }
    );
    return Task;
};

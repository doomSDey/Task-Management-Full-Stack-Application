'use strict';
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - avatarId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *           primary: true
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user.
 *           unique: true
 *         password:
 *           type: string
 *           description: The password of the user
 *         avatarId:
 *           type: string
 *           description: The avatar ID of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The auto-generated date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The auto-generated date the user was last updated
 *       example:
 *         id: 1
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: hashedpassword123
 *         avatarId: avatar123
 *         createdAt: 2023-01-01T00:00:00Z
 *         updatedAt: 2023-01-01T00:00:00Z
 */
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Task, {
                foreignKey: 'userId',
                as: 'tasks',
            });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false, // Username must not be null
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false, // Email must not be null
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false, // Password must not be null
            },
            avatarId: {
                type: DataTypes.STRING,
                allowNull: false, // Avatar will not be null
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: true,
        }
    );
    return User;
};

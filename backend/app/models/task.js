'use strict';
const { Model } = require('sequelize');

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
                allowNull: true, // Color can be null
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

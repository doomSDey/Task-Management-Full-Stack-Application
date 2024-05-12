'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define association here
            Note.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
        }
    }
    Note.init(
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
                type: DataTypes.ENUM('All', 'To Do', 'In Progress', 'Done'),
                allowNull: false, // Status must not be null
            },
            dueData: DataTypes.DATE, // Optional DATE field for dueData
        },
        {
            sequelize,
            modelName: 'Note',
        }
    );
    return Note;
};

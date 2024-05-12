'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Note, {
                foreignKey: 'userId',
                as: 'notes',
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
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false, // Password must not be null
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};

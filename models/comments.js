const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model { }

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    chirp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chirp',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
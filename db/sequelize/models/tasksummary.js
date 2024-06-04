'use strict';
const {
  Model,
  Sequelize,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskSummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskSummary.init({
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
    },
    todoCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: "todo_count",
    },
    ongoingCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: "ongoing_count",
    },
    doneCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
      field: "done_count",
    },
    userId: {
      type: Sequelize.UUID,
      field: "user_id",
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  }, {
    sequelize,
    tableName: 'task_summaries',
    modelName: 'TaskSummary',
  });
  return TaskSummary;
};

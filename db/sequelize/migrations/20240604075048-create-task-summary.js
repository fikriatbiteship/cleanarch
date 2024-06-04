'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_summaries', {
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
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task_summaries');
  }
};

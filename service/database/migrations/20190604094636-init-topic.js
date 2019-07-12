'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, NOW } = Sequelize;

    return queryInterface.createTable('topic', {
      topicId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: STRING(255) },
      topicTitle: { type: STRING(255), allowNull: true },
      topicImg: { type: STRING(1000), allowNull: false },
      address: { type: STRING(255), allowNull: true },
      created_at: { type: DATE, defaultValue: NOW },
      updated_at: { type: DATE, defaultValue: NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('topic');
  },
};

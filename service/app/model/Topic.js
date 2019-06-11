'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Topic = app.model.define(
    'topics',
    {
      topicId: { type: INTEGER, primaryKey: true, autoIncrement: true }, // 话题id
      userId: { type: STRING(255) }, // 用户id
      topicTitle: { type: STRING(255), allowNull: true }, // 话题标题
      topicImg: { type: STRING(1000), allowNull: false }, // 话题图片
      address: { type: STRING(255), allowNull: true }, // 地址
      created_at: { type: DATE, defaultValue: NOW }, // 创建时间
      updated_at: { type: DATE, defaultValue: NOW }, // 更新时间
    },
    {
      freezeTableName: true, // 不自动将表名添加复数
    }
  );

  return Topic;
};

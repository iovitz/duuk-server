"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Model = app.model.define(
    "user",
    {
      id: {
        field: "id",
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        field: "user_id",
        type: STRING(10),
        allowNull: false,
      },
      nickname: {
        field: "nickname",
        type: STRING(10),
        allowNull: false,
      },
      avatar: {
        field: "avatar",
        type: STRING(100),
        allowNull: false,
      },
      username: {
        field: "username",
        type: STRING(20),
        allowNull: false,
      },
      password: {
        field: "password",
        type: STRING(60),
        allowNull: false,
      },
      // 粉丝数
      fansNumber: {
        field: "fans_number",
        type: INTEGER,
        default: 0,
      },
      // 粉丝数
      voiceNumber: {
        field: "voice_number",
        type: INTEGER,
        default: 0,
      },
      state: {
        field: "state",
        type: BOOLEAN,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
    },
  );

  return Model;
};

const secretConfig = require("./config.secret");

module.exports = () => {
  const config = (exports = {});

  config.multiavatar_key = secretConfig.multiavatar_key;

  config.keys = secretConfig.keys;

  config.keys = secretConfig.keys;

  config.sequelize = {
    ...secretConfig.mysqlConf,
    dialect: "mysql",
    port: 3306,
    timezone: "+08:00",
    define: {
      timestamps: true, // 添加create,update,delete时间戳
      freezeTableName: true, // 防止修改表名为复数
      deletedAt: false,
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
    // 打印日志
    logging: false,
  };

  return {
    ...config,
  };
};

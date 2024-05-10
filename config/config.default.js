const path = require("path");
const { customAlphabet } = require("nanoid");

module.exports = async (appInfo) => {
  const config = (exports = {});

  const nanoid = customAlphabet("0123456789", 10);
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.static = {
    prefix: "/",
    dir: path.join(appInfo.baseDir, "app/public"),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: true,
  };

  config.cluster = {
    listen: {
      port: 9293,
    },
  };
  // https://xiaochen1024.com/cdn/fe_interview/fe-nodejs-docs-node-graphql-note-13-%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF.html
  config.io = {
    init: {}, // 透传给Engine.io
    namespace: {
      "/duuk": {
        connectionMiddleware: ["connection"],
        packetMiddleware: ["packet"],
      },
    },
    generateId() {
      return nanoid();
    },
  };

  config.validate = {
    translate(...args) {
      const translate = {
        required: "字段不能为空",
        missing_field: "字段丢失",
        "should not be empty": "字段不能为空",
        invalid: "字段校验失败",
        "should be an email": "字段应该为电子邮件格式",
      };
      return args.map((k) => translate[k]).join("");
    },
  };

  config.logger = {
    consoleLevel: "INFO",
    allowDebugAtProd: true,
  };

  exports.session = {
    key: "__server_session__",
    maxAge: 30 * 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
    sameSite: "None",
  };

  config.gzipThreshold = 1000;

  return {
    ...config,
  };
};

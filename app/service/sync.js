const Service = require("egg").Service;

module.exports = class ServiceController extends Service {
  sync() {
    return "success";
  }
};

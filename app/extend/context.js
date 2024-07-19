module.exports = {
  get $body() {
    return this.request.body;
  },
  get $query() {
    return this.request.query;
  },
  get $params() {
    return this.params;
  },
  get $header() {
    return this.request.header;
  },

  success(data, msg = "success") {
    this.status = 200;
    this.body = {
      code: 0,
      data,
      msg,
      tid: this.tid,
    };
  },
  paramsError(message = "Params Validation Failed") {
    this.status = 422;
    this.body = {
      code: 40022,
      message: Array.isArray(message) ? message.map((info) => `${info.field} ${info.code}`) : message,
      tid: this.tid,
    };
  },
  authError(message = "Login Request") {
    this.status = 403;
    this.body = {
      code: 40003,
      message,
      tid: this.tid,
    };
  },
  serverError(message = "Internal Server Error", status = 500, code = 50000) {
    this.status = status;
    this.body = {
      code,
      message,
      tid: this.tid,
    };
  },
};

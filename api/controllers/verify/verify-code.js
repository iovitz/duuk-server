/**
 * verify-code action
 *
 * @description :: 获取验证码
 * @usage       :: 'GET /api/v1/verify/verify-code': { action: 'verify/verify-code' },
 */

module.exports = {

  inputs: {
    width: {
      type: 'number',
      example: 200,
      description: 'Verify code width',
      required: true,
      custom(v) {
        return v > 0 && v < 1000;
      },
    },
    height: {
      type: 'number',
      example: 200,
      description: 'Verify code height',
      required: true,
      custom(v) {
        return v > 0 && v < 1000;
      },
    },
    type: {
      type: 'string',
      example: 'login',
      description: 'Verify code type',
      required: true,
      custom(v) {
        return v.length < 20;
      },
    },
  },

  exits: {
    ok: {
      responseType: 'ok',
    },
    badRequest: {
      responseType: 'badRequest',
    },
  },

  async fn(input, exits) {
    const { data, text: code } = VerifyService.getVerifyCode(input.width, input.height);

    this.req.session[`#c_${input.field}`] = code;
    this.req.session[`#t_${input.field}`] = Date.now();

    exits.ok(data);
  },

};

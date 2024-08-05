/**
 * notFound response
 *
 * @description :: 资源不存在
 * @usage       ::
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'notFound'
 *       }
 *     }
 * ```
 */

const statuses = require('statuses');

module.exports = function (err) {
  const code = _.get(err, 'code');
  const message = _.get(err, 'message');
  return this.res.status(404).send({
    code: code || 40004,
    message: message || statuses(404),
  });
};

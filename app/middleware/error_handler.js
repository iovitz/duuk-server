module.exports = (app) => {
  const { isProd } = app;
  return async function notFoundHandler(ctx, next) {
    try {
      if (!isProd) {
        ctx.logger.info("请求参数", ctx.$body);
      }
      await next();
    } catch (err) {
      if (!err) {
        ctx.serverError();
        return;
      }
      const { status, code } = err;

      // 422客户端参数错误
      if (status === 422) {
        if (!isProd) {
          ctx.logger.error(err);
        }
        return ctx.paramsError(err.errors ?? err.message);
      }

      ctx.logger.error(err);

      const message = status === 500 && isProd ? "Internal Server Error" : err.message ?? err.msg;

      return ctx.serverError(message, typeof status === "number" ? status : 500, typeof code === "number" ? code : 50000);
    }
  };
};

"use strict";

module.exports = (app) => {
  const { router, controller, middleware } = app;
  const { io } = app;
  const { home, verify, user, lyric, github, search } = controller;

  // Socket.IO
  io.of("/duuk").route("chat", io.controller.chat.ping);

  // 普通请求
  const homeRouter = router.namespace("/api");
  registerRouter(homeRouter, "get", "/status", home.getStatus);

  const userRouter = router.namespace("/api/user");
  registerRouter(userRouter, "post", "/register", user.register);
  registerRouter(userRouter, "post", "/login", user.login);

  const lyricRouter = router.namespace("/api/lyric");
  registerRouter(lyricRouter, "get", "/", lyric.getLyric);
  registerRouter(lyricRouter, "post", "/upload", lyric.upload, {
    auth: true,
  });

  const searchRouter = router.namespace("/api/search");
  registerRouter(searchRouter, "post", "/content", search.searchContent, {
    auth: true,
  });

  const serviceRouter = router.namespace("/api/verify");
  registerRouter(serviceRouter, "get", "/verify-code", verify.getVerifyCode);

  const githubRouter = router.namespace("/api/github");
  registerRouter(githubRouter, "get", "/commits", github.getCommits);

  function registerRouter(router, method, path, fn, config = {}) {
    const middlewares = [middleware.tracer(app), middleware.access(app), middleware.errorHandler(app), middleware.gzip(app)];

    config.auth && middlewares.unshift(middleware.auth(app));
    router[method](path, ...middlewares, fn);
  }
};

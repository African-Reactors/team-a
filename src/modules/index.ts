import router from ".././modules/auth/index";

const apiPrefix = "/api/v1";

const routes = (app: any) => {
  app.use(apiPrefix, router);
  return app;
};

export default routes;

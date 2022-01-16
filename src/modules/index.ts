// import router from ".././modules/auth/index";
import auth from '../modules/auth'

const apiPrefix = "/api/v1";

const routes = (app: any) => {
  app.use(apiPrefix, auth);
  return app;
};

export default routes;

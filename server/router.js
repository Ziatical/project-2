const controllers = require('./controllers');
// DOMO C
const mid = require('./middleware');
// end

const router = (app) => {
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  // DOMO B
  app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);
  // end

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

// export
module.exports = router;

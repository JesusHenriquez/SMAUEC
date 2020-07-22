const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.delete(
    "/api/user/:userId",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    controller.delete
  );

  app.get(
    "/api/user/:userId",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    controller.get
  );


  app.post(
    "/api/user",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,

    ],
    controller.create
  );

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

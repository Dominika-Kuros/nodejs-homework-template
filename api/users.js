const express = require("express");
const apiAuth = require("./authorization");
const ctrl = require("../controllers/auth");

const validateBody = require("../middlewares/validateBody");
// const checkBody = require("../middlewares/checkBody");
// const authenticate = require("../middlewares/authenticate");

const { loginSchema, registerSchema } = require("../models/user");

const router = express.Router();

router.post("/register", apiAuth, validateBody(registerSchema), ctrl.register);

router.post("/login", apiAuth, validateBody(loginSchema), ctrl.login);

router.get("/current", apiAuth, ctrl.current);

router.post("/logout", apiAuth, ctrl.logout);

module.exports = router;

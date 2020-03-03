"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _loginController = _interopRequireDefault(require("../controllers/loginController"));

var _registerController = _interopRequireDefault(require("../controllers/registerController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = (0, _express.Router)();
router.post("/auth/checkLogin", _loginController.default.checkToken);
router.post("/auth/login", _loginController.default.index);
router.post("/auth/register", _registerController.default.index);
router.post("/auth/data", _loginController.default.getUser);
var _default = router;
exports.default = _default;
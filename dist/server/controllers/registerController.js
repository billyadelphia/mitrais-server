"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async index(req, res) {
    try {
      let request = req.body;
      await _user.default.create(req.body);
      res.status(200);
      res.json({
        message: 'User Created successfully'
      });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({
        message: err.errors
      });
    }
  }

};
exports.default = _default;
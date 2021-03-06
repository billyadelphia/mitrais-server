"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bcrypt = require('bcrypt');

const Redis = require("ioredis");

const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
  db: 0
});
const JWT_SECRET = (process.env.AUTH_SECRET || "123456").toString();
var _default = {
  async index(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
      let user = await _user.default.findOne({
        where: {
          email: email
        }
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        let token = _jsonwebtoken.default.sign({
          email: email
        }, JWT_SECRET, {
          expiresIn: '24h'
        }); // return the JWT token for the future API calls


        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.status(403);
        res.json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  },

  checkToken(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      _jsonwebtoken.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(500);
          res.json({
            isAuthenticated: false,
            message: 'Token is not valid'
          });
        } else {
          console.log(decoded);
          res.json({
            isAuthenticated: true
          });
        }
      });
    } else {
      res.status(500);
      res.json({
        isAuthenticated: false,
        message: 'Auth token is not supplied'
      });
    }
  },

  async getUser(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      _jsonwebtoken.default.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          res.status(500);
          res.json({
            isAuthenticated: false,
            message: 'Token is not valid'
          });
        } else {
          let user = await _user.default.findOne({
            where: {
              "email": decoded.email
            }
          });
          user = user.get({
            plain: true
          });
          delete user.password;
          res.json({
            data: user
          });
        }
      });
    } else {
      res.status(500);
      res.json({
        isAuthenticated: false,
        message: 'Auth token is not supplied'
      });
    }
  }

};
exports.default = _default;
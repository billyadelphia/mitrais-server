"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Op = exports.DataTypes = exports.sequelize = exports.Model = void 0;
const env = process.env.NODE_ENV === 'staging' ? 'development' : process.env.NODE_ENV || 'development';

const config = require('../config/database')[env];

const Sequelize = require('sequelize');

const Model = Sequelize.Model;
exports.Model = Model;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
const DataTypes = Sequelize;
exports.DataTypes = DataTypes;
const Op = Sequelize.Op;
exports.Op = Op;
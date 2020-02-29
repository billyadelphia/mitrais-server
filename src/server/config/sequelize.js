const env = process.env.NODE_ENV === 'staging' ? 'development' : process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const Sequelize = require('sequelize');
export const Model = Sequelize.Model;
export const sequelize = new Sequelize(config.database, config.username, config.password, config);
export const DataTypes = Sequelize;
export const Op = Sequelize.Op;
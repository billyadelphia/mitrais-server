"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("../config/sequelize");

const bcrypt = require('bcrypt');

const saltRounds = 10;

class User extends _sequelize.Model {}

User.init({
  id: {
    type: _sequelize.DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      max: 255,
      notEmpty: true,

      async isUniqueEmail(value) {
        if (value) {
          let user = await User.findOne({
            where: {
              email: value
            }
          });

          if (user) {
            throw new Error("Email is Already Taken");
          }
        }
      }

    }
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mobile_number: {
    type: _sequelize.DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      notEmpty: true,

      isIndonesianNumber(value) {
        if (value.substring(0, 1) !== "0" && value.substring(0, 2) !== "62") {
          throw new Error("Please enter valid Indonesian phone number!");
        }
      },

      async isUniqueMobile(value) {
        if (value) {
          let mobile_number = `62${value.substring(1, value.length)}`;
          let user = await User.findOne({
            where: {
              mobile_number: mobile_number
            }
          });

          if (user) {
            throw new Error("Mobile Number is Already Taken");
          }
        }
      }

    }
  },
  first_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 50
    }
  },
  last_name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 50
    }
  },
  date_of_birth: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true,
    validate: {
      notEmpty: false,
      isDate: true
    }
  },
  gender: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['male', 'female', null, ""]]
    }
  }
}, {
  sequelize: _sequelize.sequelize,
  modelName: 'User',
  tableName: 'users',
  hooks: {
    async beforeCreate(attributes, options) {
      if (attributes.mobile_number && attributes.mobile_number.substring(0, 1) === "0") {
        attributes.mobile_number = `62${attributes.mobile_number.substring(1, attributes.mobile_number.length)}`;
      }

      if (attributes.password) {
        console.log("attributes.password", attributes.password);
        attributes.password = await bcrypt.hash(attributes.password, saltRounds);
        console.log("attributes.password2", attributes.password);
      }
    }

  }
});
var _default = User;
exports.default = _default;
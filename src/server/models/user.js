import { DataTypes, Model, sequelize } from "../config/sequelize";
const bcrypt = require('bcrypt');
const saltRounds = 10;
class User extends Model {

}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            max: 255,
            notEmpty: true,
            async isUniqueEmail(value) {
                if (value) {
                    let user = await User.findOne({ where: { email: value } });
                    if (user) {
                        throw new Error("Email is Already Taken");
                    }
                }

            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    mobile_number: {
        type: DataTypes.INTEGER.UNSIGNED,
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
                    let user = await User.findOne({ where: { mobile_number: mobile_number } });
                    if (user) {
                        throw new Error("Mobile Number is Already Taken");
                    }
                }
            }
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            max: 50,
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            max: 50,
        }
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: false,
            isDate: true,
        }
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            isIn: [
                ['male', 'female', null, ""]
            ],
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        async beforeCreate(attributes, options) {
            if (attributes.mobile_number && attributes.mobile_number.substring(0, 1) === "0") {
                attributes.mobile_number = `62${attributes.mobile_number.substring(1, attributes.mobile_number.length)}`;
            }
            if (attributes.password) {
                console.log("attributes.password", attributes.password)
                attributes.password = await bcrypt.hash(attributes.password, saltRounds);
                console.log("attributes.password2", attributes.password)
            }
        }
    }
});

export default User;
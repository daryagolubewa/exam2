'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Item, { foreignKey: "user_id"})
  };

    User.getEmail = async (email) => {
        return await User.findAll({
            where: {
                email: email
            }
        })
    }

    User.getName = async (name) => {
        return await User.findAll({
            where: {
                username: name
            }
        })
    }

  return User;
};


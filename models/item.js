'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    condition: DataTypes.STRING,
    starts_at: DataTypes.DATE,
    ends_at: DataTypes.DATE,
    description: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
      Item.belongsTo(models.User, { foreignKey: "item_id"})
  };
  return Item;
};
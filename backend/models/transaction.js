'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction.hasMany(models.order, {
        as: "orders",
        foreignKey: {
          name: "transactionID",
        },
      }),      
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userID",
        },
      });    
      transaction.belongsTo(models.user, {
        as: "seller",
        foreignKey: {
          name: "sellerID",
        },
      });    
    }
  };
  transaction.init({
    userID: DataTypes.STRING,
    sellerID: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
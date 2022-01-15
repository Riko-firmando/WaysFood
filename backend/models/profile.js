'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profile.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userID",
        },
      });
    }
  };
  profile.init({
    userID: DataTypes.INTEGER,
    location: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};
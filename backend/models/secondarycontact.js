'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SecondaryContact extends Model {
    static associate(models) {
      // A SecondaryContact belongs to a User
      SecondaryContact.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  SecondaryContact.init({
    userId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    relationship: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SecondaryContact',
  });
  return SecondaryContact;
};

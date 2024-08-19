'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Profile.init({
    userId: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    idNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    location: DataTypes.STRING,
    profilePhoto: DataTypes.STRING,
    idPhoto: DataTypes.STRING,
    nickname: DataTypes.STRING, // New field
    status: DataTypes.TEXT, // New field
    aboutMyself: DataTypes.TEXT, // New field
    latitude: DataTypes.FLOAT, // New field
    longitude: DataTypes.FLOAT, // New field
    customerNeeds: DataTypes.TEXT // New field
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};

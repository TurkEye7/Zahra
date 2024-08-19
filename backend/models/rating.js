'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // A Rating belongs to a User and a Rater (who gave the rating)
      Rating.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Rating.belongsTo(models.User, { foreignKey: 'raterId', as: 'rater' });
    }
  }
  Rating.init({
    userId: DataTypes.UUID,
    raterId: DataTypes.UUID,
    rating: DataTypes.INTEGER,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};

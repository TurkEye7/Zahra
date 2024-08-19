'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    static associate(models) {
      // A Friend relationship belongs to two Users
      Friend.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Friend.belongsTo(models.User, { foreignKey: 'friendId', as: 'friend' });
    }
  }
  Friend.init({
    userId: DataTypes.UUID,
    friendId: DataTypes.UUID,
    status: DataTypes.STRING // 'pending', 'accepted'
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};

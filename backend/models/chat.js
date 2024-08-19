'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // A Chat message belongs to a Sender and a Receiver (both Users)
      Chat.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      Chat.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
  }
  Chat.init({
    senderId: DataTypes.UUID,
    receiverId: DataTypes.UUID,
    message: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};

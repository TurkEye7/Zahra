module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,  // Change this to UUID
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aboutMyself: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customerNeeds: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  });

  return Profile;
};

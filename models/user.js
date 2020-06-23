"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {}
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};

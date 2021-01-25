module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,

    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    pseudo: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      
    },

    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
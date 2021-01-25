module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING(200),
      allowNull: false,

    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isSignaled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
    
  });

  return Post;
};
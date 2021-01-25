module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isSignaled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  });

  return Comment;
};
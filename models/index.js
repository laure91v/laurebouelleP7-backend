const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);

db.posts.belongsTo(db.users, {
  onDelete: 'cascade', 
  onupdate: 'cascade',
});
db.comments.belongsTo(db.users, {
  onDelete: 'cascade', 
  onupdate: 'cascade',
});
db.comments.belongsTo(db.posts, {
  onDelete: 'cascade', 
  onupdate: 'cascade'
});

module.exports = db;
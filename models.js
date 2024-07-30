const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todo_app', 'jocos_payroll_user', 'cedrickarldb', {
  dialect: 'mysql',
  port: 3308,
});

class User extends Model {}
User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

// Sync the model with the database
sequelize.sync();

module.exports = {
  sequelize,
  User
};

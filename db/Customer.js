const conn = require('./conn');
const {Sequelize} = conn;

const Customer = conn.define('customer', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  getterMethods: {
    name: function() {
      return this.email.split('@')[0];
    },
    provider: function() {
      return this.email.split('@')[1].split('.')[0];
    }
  }
});

module.exports = Customer;

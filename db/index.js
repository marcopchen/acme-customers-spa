const conn = require('./conn');
const Customer = require('./Customer');

const sync = () => {
  return conn.sync({ force: true });
};

const data = [
  { email: 'max@gmail.com' },
  { email: 'mark@gmail.com' },
  { email: 'marco@gmail.com' }
];

const seed = () => {
  return Promise.all(data.map(customer => Customer.create(customer)));
};

module.exports = {
  sync,
  seed,
  models: {
    Customer
  }
};

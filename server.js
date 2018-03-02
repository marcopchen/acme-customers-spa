const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

const path = require('path');
app.use(express.static(path.join(__dirname, '.', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { models } = db;
const { Customer } = models;

app.get('/api/customers', (req, res, next) => {
  Customer.findAll()
    .then(customers => {
      res.json(customers);
    })
    .catch(next);
});

app.post('/api/customers', (req, res, next) => {
  Customer.create(req.body)
    .then(customer => {
      res.json(customer);
    })
    .catch(next);
});

app.delete('/api/customers/:id', (req, res, next) => {
  Customer.findById(req.params.id)
    .then(customer => customer.destroy())
    .catch(next);
});

app.use((err, req, res, next) => {
  res.send({error: err});
});

db.sync()
  .then(() => db.seed());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

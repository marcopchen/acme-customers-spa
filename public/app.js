const customerList = document.getElementById('customers-list');
const createButton = document.getElementById('create-btn');
const emailForm = document.getElementById('email');

const addCustomer = (data) => {
  const item = document.createElement('li');
  item.append(data.name);
  item.addEventListener('click', () => {
    fetch(`/api/customers/${data.id}`, {
      method: 'delete'
    });
    item.remove();
  });
  customerList.append(item);
  emailForm.value = '';
};

createButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/api/customers', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({ email: emailForm.value })
  })
    .then(res => {
      if (!res.ok) {
        throw res.json();
      }
      res.json();
    })
    .then(customer => addCustomer(customer))
    .catch(ex => {
      ex.then(err => {
        const message = document.getElementById('message');
        message.innerHTML = err.error.errors[0].message;
      });
    });
});

fetch('/api/customers')
  .then(res => res.json())
  .then(customers => {
    customers.forEach(customer => addCustomer(customer));
  })
  .catch(console.error);

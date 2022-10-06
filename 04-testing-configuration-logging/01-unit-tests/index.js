const Validator = require('./Validator');

const validator = new Validator({
  name: {
    type: 'string',
    min: 3,
    max: 10,
  },
  age: {
    type: 'number',
    min: 18,
    max: 30,
  },
});

const errors = validator.validate({
  name: 'Jane Doe',
  age: 19,
});

console.log(errors);


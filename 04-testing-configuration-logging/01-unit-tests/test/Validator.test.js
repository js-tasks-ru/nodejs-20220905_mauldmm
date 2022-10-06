const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    describe('Строковое поле', () => {
      describe('Не нормальное значение длины', () => {
        it('Проверяет пустую строку', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: ''});

          expect(errors[0]).to.have.property('field').and.to.be.equal('name');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too short, expect 3, got 0');
        });

        it('Проверяет минимальную длину', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 'fo'});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('name');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too short, expect 3, got 2');
        });

        it('Проверяет максимальную длину', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 'foobar bazb'});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('name');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too long, expect 10, got 11');
        });
      });

      describe('Нормальное значение длины', () => {
        it('Нижнаяя граница', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 'foo'});

          expect(errors).to.be.empty;
        });

        it('Нормальное значение', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 'foo bar'});

          expect(errors).to.be.empty;
        });

        it('Строка из пробелов', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: '    '});

          expect(errors).to.be.empty;
        });

        it('Верхняя граница', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 'foobar baz'});

          expect(errors).to.be.empty;
        });
      });

      describe('Тип', () => {
        it('Проверяет тип', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({name: 15});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('name');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('expect string, got number');
        });
      });
    });

    describe('Числовое поле', () => {
      describe('Не нормальное значение длины', () => {
        it('Проверяет минимальное значение', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 17});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too little, expect 18, got 17');
        });

        it('Проверяет максимальное значение', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 36});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too big, expect 35, got 36');
        });

        it('Проверяет максимальное значение с бесконечностью', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: Infinity});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too big, expect 35, got Infinity');
        });
      });

      describe('Нормальное значение величины', () => {
        it('Нижнаяя граница', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 18});

          expect(errors).to.be.empty;
        });

        it('Нормальное значение', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 25});

          expect(errors).to.be.empty;
        });

        it('Верхняя граница', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 35});

          expect(errors).to.be.empty;
        });
      });

      describe('Тип', () => {
        it('Проверяет тип', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
          });

          const errors = validator.validate({age: 'foo'});

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('expect number, got string');
        });
      });
    });

    describe('Несколько полей', () => {
      describe('Нормальные значени', () => {
        it('Разный типы', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({
            age: 25,
            name: 'foo bar',
          });

          expect(errors).to.be.empty;
        });

        it('Одинаковые типы', () => {
          const validator = new Validator({
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
            surname: {
              type: 'string',
              min: 3,
              max: 15,
            },
          });

          const errors = validator.validate({
            name: 'Jane',
            surname: 'Doe',
          });

          expect(errors).to.be.empty;
        });
      });

      describe('Не нормальные значения', () => {
        it('Разный типы, одна ошибка', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({
            age: 17,
            name: 'foo bar',
          });

          expect(errors).to.have.length(1);
          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too little, expect 18, got 17');
        });

        it('Разный типы, несколько ошибок', () => {
          const validator = new Validator({
            age: {
              type: 'number',
              min: 18,
              max: 35,
            },
            name: {
              type: 'string',
              min: 3,
              max: 10,
            },
          });

          const errors = validator.validate({
            age: 17,
            name: 'foo bar baz',
          });

          expect(errors).to.have.length(2);

          expect(errors[0]).to.have.property('field').and.to.be.equal('age');
          expect(errors[0]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too little, expect 18, got 17');

          expect(errors[1]).to.have.property('field').and.to.be.equal('name');
          expect(errors[1]).
              to.
              have.
              property('error').
              and.
              to.
              be.
              equal('too long, expect 10, got 11');
        });
      });
    });
  });
});

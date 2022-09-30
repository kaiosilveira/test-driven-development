const { sum } = require('.');

describe('sum', () => {
  it('should sum two numbers and return the result', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

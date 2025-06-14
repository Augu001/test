import { compute } from '../App';

describe('compute', () => {
  test('adds numbers', () => {
    expect(compute(2, '+', 3)).toBe(5);
  });

  test('handles division by zero', () => {
    expect(compute(2, '÷', 0)).toBe(0);
  });
});

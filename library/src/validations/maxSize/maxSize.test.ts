import { describe, expect, test } from 'vitest';
import { maxSize } from './maxSize.ts';

describe('maxSize', () => {
  const info = { reason: 'any' as const };

  test('should pass only valid sizes', () => {
    const validate = maxSize(3);

    const value1 = new Map();
    expect(validate(value1, info)).toEqual({ output: value1 });
    const value2 = new Map().set(1, 1).set(2, 2).set(3, 3);
    expect(validate(value2, info)).toEqual({ output: value2 });
    const value3 = new Set();
    expect(validate(value3, info)).toEqual({ output: value3 });
    const value4 = new Set().add(1).add(2).add(3);
    expect(validate(value4, info)).toEqual({ output: value4 });

    expect(validate(value2.set(4, 4), info).issues?.length).toBe(1);
    expect(validate(value4.add(4), info).issues?.length).toBe(1);
    expect(validate(value4.add(5), info).issues?.length).toBe(1);
  });

  test('should return custom error message', () => {
    const error = 'Value size is greater than "2"!';
    const value = new Set().add(1).add(2).add(3);
    const validate = maxSize(2, error);
    expect(validate(value, info).issues?.[0].message).toBe(error);
  });
});

import { InvalidUuidError, Uuid } from '../uuid.vo';

import { v4 as uuidV4, validate as uuidValidate } from 'uuid';

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  it('should throw an error when an invalid uuid is passed', () => {
    expect(() => {
      new Uuid('Invalid Uuid');
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept a valid uuid', () => {
    const uuid = new Uuid(uuidV4());
    expect(uuid.id).toBeDefined();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

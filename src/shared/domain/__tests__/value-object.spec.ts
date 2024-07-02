import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  it('should be equals ', () => {
    const valueObject1 = new StringValueObject('any');
    const valueObject2 = new StringValueObject('any');
    expect(valueObject1.equals(valueObject2)).toBe(true);

    const complexValueObject1 = new ComplexValueObject('teste', 1);
    const complexValueObject2 = new ComplexValueObject('teste', 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(true);
  });

  it('should not be equals ', () => {
    const valueObject1 = new StringValueObject('any');
    const valueObject2 = new StringValueObject('other');
    expect(valueObject1.equals(valueObject2)).toBe(false);
    expect(valueObject1.equals(null as any)).toBe(false);
    expect(valueObject1.equals(undefined as any)).toBe(false);

    const complexValueObject1 = new ComplexValueObject('teste', 1);
    const complexValueObject2 = new ComplexValueObject('teste', 2);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(false);
  });
});

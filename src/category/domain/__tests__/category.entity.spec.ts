import { EntityValidationError } from '../../../shared/domain/validators/validation-error';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  });

  it('should change name', () => {
    const category = Category.create({ name: 'any_name' });
    category.changeName('other_name');
    expect(category.name).toBe('other_name');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should change description', () => {
    const category = Category.create({
      name: 'any_name',
      description: 'any_description',
    });
    category.changeDescription('other_description');
    expect(category.description).toBe('other_description');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it('should activate a category', () => {
    const category = Category.create({
      name: 'any_name',
      description: 'any_description',
      isActive: false,
    });
    category.activate();
    expect(category.isActive).toBeTruthy();
  });

  it('should disable a category', () => {
    const category = Category.create({
      name: 'any_name',
      description: 'any_description',
      isActive: true,
    });
    category.deactivate();
    expect(category.isActive).toBeFalsy();
  });

  describe('category categoryId field', () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: new Uuid() },
    ];
    it.each(arrange)('id = %j', ({ categoryId }) => {
      const category = new Category({
        name: 'Movie',
        categoryId: categoryId as any,
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      if (categoryId instanceof Uuid) {
        expect(category.categoryId).toBe(categoryId);
      }
    });
  });

  describe('constructor', () => {
    it('should create a Category with default values', () => {
      const category = new Category({ name: 'Movie' });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    it('should create a Category with all values', () => {
      const createdAt = new Date();
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
        createdAt,
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBe(createdAt);
    });

    it('should create a Category with name and description', () => {
      const createdAt = new Date();
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('create command', () => {
    it('should create a Category with default values', () => {
      const category = Category.create({ name: 'Movie' });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a Category with all values', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.isActive).toBeFalsy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a Category with name and description', () => {
      const createdAt = new Date();
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Category Validator', () => {
  describe('create command', () => {
    it('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() =>
        Category.create({ name: 't'.repeat(256) })
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    it('should create a invalid categroy using description', () => {
      expect(() =>
        Category.create({ description: 5 } as any)
      ).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('should create a invalid category using isActive property', () => {
      expect(() =>
        Category.create({ isActive: 5 } as any)
      ).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      });
    });
  });
});

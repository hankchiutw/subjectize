import { expect } from '@esm-bundle/chai';
import { extendPropertyAccessor } from './extendPropertyAccessor';

describe('extendPropertyAccessor', () => {
  it('should be ok without input', () => {
    const obj = {};
    extendPropertyAccessor(obj, 'prop');
    expect(obj).to.be.ok;
  });

  it('should keep origin value', () => {
    const expectedValue = 100;
    const obj = {
      prop: expectedValue,
    };
    extendPropertyAccessor(obj, 'prop');
    expect(obj.prop).equal(expectedValue);
  });

  describe('getter', () => {
    it('should work without setter', () => {
      const expectedValue = 100;
      const obj = {
        get prop() {
          return expectedValue;
        },
      };
      extendPropertyAccessor(obj, 'prop');

      expect(obj.prop).equal(expectedValue);
    });
  });

  describe('setter', () => {
    it('should work', () => {
      let shouldBeCalled = null;
      const originValue = 10;
      const expectedValue = 100;
      const obj = {
        prop: originValue,
      };
      extendPropertyAccessor(obj, 'prop', {
        set(value) {
          shouldBeCalled = value;
        },
      });

      expect(obj.prop).equal(originValue);
      obj.prop = expectedValue;
      expect(shouldBeCalled).to.be.ok;
      expect(obj.prop).equal(expectedValue);
    });

    it('should keep origin setter', () => {
      let originSetterCalled = null;
      let shouldBeCalled = null;
      const obj = {
        set prop(value: unknown) {
          originSetterCalled = value;
        },
      };
      extendPropertyAccessor(obj, 'prop', {
        set(value) {
          shouldBeCalled = value;
        },
      });

      obj.prop = true;
      expect(originSetterCalled).to.be.ok;
      expect(shouldBeCalled).to.be.ok;
    });
  });
});

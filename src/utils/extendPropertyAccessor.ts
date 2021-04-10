type Getter = () => unknown;
type Setter = (_: unknown) => void;

/**
 * Extend a property getter or setter.
 */
export function extendPropertyAccessor(
  proto: unknown,
  prop: string,
  config: { get?: Getter; set?: Setter } = {},
): void {
  const internalKey = Symbol(prop);
  const propDescriptor = Object.getOwnPropertyDescriptor(proto, prop);
  const { get: getterFunc, set: setterFunc } = config;

  const get =
    getterFunc ||
    propDescriptor?.get ||
    function () {
      if (propDescriptor?.value && this[internalKey] === undefined) {
        this[internalKey] = propDescriptor.value;
      }
      return this[internalKey];
    };

  const set = function (value: unknown) {
    this[internalKey] = value;
    // keep existing setter working
    if (propDescriptor?.set) {
      propDescriptor.set.call(this, value);
    }
    setterFunc?.call(this, value);
  };

  Object.defineProperty(proto, prop, {
    get,
    set,
    configurable: true,
  });
}

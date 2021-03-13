type Getter = () => unknown;
type Setter = (_: unknown) => void;

/**
 * Extend a property getter or setter.
 */
export function extendPropertyAccessor(
  proto: unknown,
  prop: string,
  config: { get?: Getter; set?: Setter }
) {
  const internalKey = `__${prop}`;
  const propDescriptor = Object.getOwnPropertyDescriptor(proto, prop);
  const { get: getterFunc, set: setterFunc } = config;

  const get = getterFunc
    ? getterFunc
    : propDescriptor
    ? propDescriptor.get
    : function () {
        return this[internalKey];
      };

  const set = function (value: undefined) {
    this[internalKey] = value;
    // keep existing setter working
    if (propDescriptor) {
      propDescriptor.set.call(this, value);
    }
    setterFunc.call(this, value);
  };

  Object.defineProperty(proto, prop, {
    get,
    set,
    configurable: true,
  });
}

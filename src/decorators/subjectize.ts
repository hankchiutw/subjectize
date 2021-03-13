import { extendPropertyAccessor } from '../utils/extendPropertyAccessor';

/**
 * Make a {@link Subject}-like property that watches the value of the property `keyToWatch`.
 *
 * @remarks
 * Users must initialize the property in the class definition.
 * Recommend using {@link ReplaySubject} to initialize the property. Thus we don't need to
 * set Subject's initial value and new subscribers can get current value.
 *
 * E.g.
 * ```
 * @Subjectize('someProp')
 * public someProp$ = new ReplaySubject<SomeProp>(1);
 * ```
 */
export function Subjectize(keyToWatch: string): PropertyDecorator {
  return (proto: unknown, propKey: string) => {
    extendPropertyAccessor(proto, keyToWatch, {
      set: function (value: unknown) {
        this[propKey].next(value);
      },
    });
  };
}

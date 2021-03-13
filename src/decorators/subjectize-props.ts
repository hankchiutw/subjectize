import { extendPropertyAccessor } from '../utils/extendPropertyAccessor';

/**
 * Make a {@link Subject}-like property that watches all values of the property in `keys`.
 *
 * @remarks
 * E.g.
 * ```
 * @SubjectizeProps(['someProp', 'anotherProp'])
 * public prop$ = new ReplaySubject<[string, any]>(1);
 * ```
 */
export function SubjectizeProps(keys: string[]): PropertyDecorator {
  return (proto: unknown, propKey: string) => {
    keys.forEach((keyToWatch) => {
      extendPropertyAccessor(proto, keyToWatch, {
        set: function (value: unknown) {
          this[propKey].next([keyToWatch, value]);
        },
      });
    });
  };
}

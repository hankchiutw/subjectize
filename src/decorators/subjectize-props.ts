import type { Subject } from 'rxjs';
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
export function SubjectizeProps<T>(keys: string[]): PropertyDecorator {
  return (proto: unknown, propKey: string) => {
    // emit current value when initializing the Subject
    extendPropertyAccessor(proto, propKey, {
      set(value: Subject<[string, T]>) {
        keys.forEach((keyToWatch) => {
          if (this[keyToWatch] !== undefined) {
            value.next([keyToWatch, this[keyToWatch]]);
          }
        });
      },
    });

    keys.forEach((keyToWatch) => {
      extendPropertyAccessor(proto, keyToWatch, {
        set: function (value: unknown) {
          if (this[propKey] === undefined) {
            return;
          }
          this[propKey].next([keyToWatch, value]);
        },
      });
    });
  };
}

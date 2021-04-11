import type { Subject } from 'rxjs';
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
export function Subjectize<T>(keyToWatch: string): PropertyDecorator {
  return (proto: unknown, propKey: string) => {
    // emit current value when initializing the Subject
    extendPropertyAccessor(proto, propKey, {
      set(value: Subject<T>) {
        if (this[keyToWatch] !== undefined) {
          value.next(this[keyToWatch]);
        }
      },
    });

    extendPropertyAccessor(proto, keyToWatch, {
      set: function (value: unknown) {
        if (this[propKey] === undefined) {
          return;
        }
        this[propKey].next(value);
      },
    });
  };
}

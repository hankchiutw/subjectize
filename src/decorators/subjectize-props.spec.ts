import { merge, ReplaySubject } from 'rxjs';
import { Subjectize } from './subjectize';
import { SubjectizeProps } from './subjectize-props';

describe('SubjectizeProps', () => {
  it('should watch props by SubjectizeProps', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);
    }

    const obj = new Test();
    const expectedValue = {
      prop1: 99,
      prop2: 'hello',
    };
    let count = 0;
    obj.prop12$.subscribe({
      next: ([key, value]) => {
        expect(value).toBe(expectedValue[key]);
        count++;
        if (count === 2) {
          done();
        }
      },
    });
    obj.prop1 = expectedValue.prop1;
    obj.prop2 = expectedValue.prop2;
  });

  it('should not override Subjectize', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;

      @Subjectize('prop1')
      public prop1$ = new ReplaySubject<number>(1);

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);
    }

    const obj = new Test();
    const expectedValue = 99;
    obj.prop1 = expectedValue;
    obj.prop1$.subscribe((value) => {
      expect(value).toBe(expectedValue);
      done();
    });
  });

  it('should work after Subjectize', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;

      @Subjectize('prop1')
      public prop1$ = new ReplaySubject<number>(1);

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);
    }

    const obj = new Test();
    const expectedValue = {
      prop1: 99,
      prop2: 'hello',
    };
    let count = 0;
    obj.prop12$.subscribe({
      next: ([key, value]) => {
        expect(value).toBe(expectedValue[key]);
        count++;
        if (count === 2) {
          done();
        }
      },
    });
    obj.prop1 = expectedValue.prop1;
    obj.prop2 = expectedValue.prop2;
  });

  it('Multiple SubjectizeProps should work for the same prop', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;
      public prop3: string;

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);

      @SubjectizeProps(['prop1', 'prop3'])
      public prop13$ = new ReplaySubject<[string, number | string]>(1);
    }

    const obj = new Test();
    const expectedValue = 99;
    obj.prop1 = expectedValue;

    let count = 0;
    merge(obj.prop12$, obj.prop13$).subscribe(([prop, value]) => {
      expect(prop).toBe('prop1');
      expect(value).toBe(expectedValue);
      count++;
      if (count === 2) {
        done();
      }
    });
  });
});

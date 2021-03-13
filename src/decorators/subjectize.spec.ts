import { ReplaySubject } from 'rxjs';
import { Subjectize } from './subjectize';
import { SubjectizeProps } from './subjectize-props';

describe('Subjectize', () => {
  it('should watch a prop by Subjectize', (done) => {
    class Test {
      public prop1: number;

      @Subjectize('prop1')
      public prop1$ = new ReplaySubject<number>(1);
    }

    const obj = new Test();
    const expectedValue = 99;
    obj.prop1 = expectedValue;
    obj.prop1$.subscribe((value) => {
      expect(value).toBe(expectedValue);
      done();
    });
  });

  it('should not override SubjectizeProps', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);

      @Subjectize('prop1')
      public prop1$ = new ReplaySubject<number>(1);
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

  it('should work after SubjectizeProps', (done) => {
    class Test {
      public prop1: number;
      public prop2: string;

      @SubjectizeProps(['prop1', 'prop2'])
      public prop12$ = new ReplaySubject<[string, number | string]>(1);

      @Subjectize('prop1')
      public prop1$ = new ReplaySubject<number>(1);
    }

    const obj = new Test();
    const expectedValue = 99;
    obj.prop1 = expectedValue;
    obj.prop1$.subscribe((value) => {
      expect(value).toBe(expectedValue);
      done();
    });
  });
});

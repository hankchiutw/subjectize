# Subjectize
> TypeScript decorators for binding RxJS Subject with class properties

<p>
<img alt="Version" src="https://img.shields.io/npm/v/subjectize" />
<a href="https://twitter.com/hankchiu_tw" target="_blank">
<img alt="Twitter: hankchiu_tw" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fhankchiu_tw" />
</a>
</p>

## Install

```sh
npm i -S subjectize
```
or

```sh
yarn add subjectize
```


### Quick start
```js
import { Subjectize, SubjectizeProps } from 'subjectize';
import { ReplaySubject } from 'rxjs';

class SomeClass {
  propA: any;
  propB: any;

  @Subjectize('propA')
  propA$ = new ReplaySubject(1);

  @SubjectizeProps(['propA', 'propB'])
  propAB$ = new ReplaySubject(1);
}

const instance = new SomeClass();
instance.propA = 'A';
instance.propB = 'B';

// would print 'A'
instance.propA$.subscribe(console.log);

// would print ['propA', 'A'], then ['propB', 'B']
instance.propAB$.subscribe(console.log);

```


### Use with Angular @Input
```js
import { Component, Input } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Subjectize } from "subjectize";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: []
})
export class CounterComponent {
  @Input()
  count: number;

  @Subjectize("count")
  count$ = new ReplaySubject(1);
}
```
See full example [here](https://codesandbox.io/s/goofy-wu-q5w9q?file=/src/app/demo/counter.component.ts).

## How it works
- [Intercept input property changes with a setter](https://angular.io/guide/component-interaction#intercept-input-property-changes-with-a-setter)


## Author

👤 **hankchiutw**

* Website: https://hankchiu.tw/
* Twitter: [@hankchiu\_tw](https://twitter.com/hankchiu\_tw)
* Github: [@hankchiutw](https://github.com/hankchiutw)
* LinkedIn: [@hankchiutw](https://linkedin.com/in/hankchiutw)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [hankchiutw](https://github.com/hankchiutw).<br />
This project is [MIT](LICENSE) licensed.

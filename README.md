# solve&#46;io

[![npm version](https://badge.fury.io/js/solve.io.svg)](https://badge.fury.io/js/solve.io)

테스트 프레임워크를 이용한 알고리즘 문제 풀이를 위한 I/O 도구

## 1. Description

[Baekjoon Online Judge](https://www.acmicpc.net/), [ALGOSPOT](https://www.algospot.com/) 등의 Problem Solving (이하 "PS") 온라인 저지에서는 문제의 입력이 Standard Input으로 주어지고, 정답을 Standard Output으로 출력해야 하는 경우가 많습니다.

그에 반해, [Programmers](https://programmers.co.kr/), [LeetCode](https://leetcode.com/) 등은 문제의 입력을 함수의 인자로, 정답을 함수의 반환값으로 하고 있습니다.

solve&#46;io는 Standard I/O를 기반으로 하는 PS를 함수를 기반으로 하는 PS로 바꿔주는 역할을 합니다.

이를 통해 jest와 같은 테스트 프레임워크를 사용하여 PS를 할 수 있게 도와줍니다.

## 2. Usage

solve.io는 CommonJS 모듈 시스템을 채택하였습니다.

solve.io 모듈을 import 하면 default로 `genSolve` 함수를 반환합니다.

```ts
type GenSolve = (filepath: string) => (input: string) => Promise<string>;

const genSolve = require("solve.io");
```

`genSolve` 함수는 PS 코드의 filepath를 인자로 받아 PS 코드를 실행시키는 함수(`solve`)를 반환합니다.

`solve`함수는 문제의 입력값을 인자로 전달 받아 PS 후 Standard Output을 string의 형태로 반환합니다.

## 3. 사용법 예시

[BoJ 문제 1000번](https://www.acmicpc.net/problem/1000)

### 3-1. 문제

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

**입력**
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

**출력**
첫째 줄에 A+B를 출력한다.

**예제 입력**
1 2

**예제 출력**
3

### 3-2. solve&#46;io 를 이용한 풀이

```js
// 1000.js
const answer = require("fs")
  .readFileSync(0, "utf-8")
  .split(" ")
  .map(Number)
  .reduce((a, b) => a + b);

console.log(answer);

// 1000.test.js
const path = require("path");
const genSolve = require("solve.io");
const solve = genSolve(path.resolve(__dirname, "1000.js"));

test("예제 1", async () => {
  const input = `1 2`;
  const output = `3
`;

  expect(await solve(input)).toBe(output);
});
```

#### ※ 주의사항

1. `filepath`는 절대경로여야 합니다. 절대경로가 아닐 경우 예외가 발생합니다.

2. 반환된 함수(이하 `Solve`)는 문제 풀이 실행 중 stderr에 출력이 있는 경우, rejected Promise를 반환합니다.

## 4. FAQ

### - 왜 ESModule이 아닌 CommonJS를 사용하나요?

[BOJ의 컴파일 환경](https://www.acmicpc.net/help/language)은 다음과 같습니다.

```sh
## node.js

- 언어 번호: 17
- 실행: node Main.js
- 버전: v14.15.0
- 시간 제한: ×3+2 초
- 메모리 제한: ×2 MB
```

node v13.x 부터 ESModule을 지원하고 있으나, 파일의 확장자가 mjs 이거나 `package.json` 의 type 이 module일 때만 ESModule을 사용할 수 있습니다.

BOJ에서는 `node Main.js`를 실행하므로 ESModule을 사용할 수 없습니다. 이에 CommonJS 모듈 시스템으로 작성하였으며, 추후에 Dual Module을 지원할 수도 있습니다.

### - 테스트 프레임워크를 이용해서 알고리즘을 푸는게 일반적인가요?

아니요, 일반적이지 않습니다.
PS의 기본은 빠른 시간내에 정확하게 문제를 푸는 것입니다. 이미 알고리즘에 숙련된 사람에게 PS는 익힌 알고리즘을 한 번 적용해보는 것이지만, 알고리즘을 공부하는 사람에게는 PS는 알고리즘을 익히는 데 좋은 도구입니다. 한 번 문제를 풀고 끝나는 것이 아니라, 여러 가지 풀이 방법을 시도해보고 더 나은 시간복잡도를 위해 리팩토링 해보는 것이 매우 중요하다고 생각합니다.
리팩토링 시 기본은 테스트 코드를 작성하는 것입니다. 기존의 Standard I/O 를 이용한 방식에서는 테스트 코드 작성이 쉽지 않아 solve.io를 만들었습니다.

## 5. Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

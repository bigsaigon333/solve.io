# solve&#46;io

[![npm version](https://badge.fury.io/js/@bigsaigon333%2Fsolve.io.svg)](https://badge.fury.io/js/@bigsaigon333%2Fsolve.io)

알고리즘 문제 풀이를 위한 I/O 검증 자동화 CLI

## 1. Description

[Baekjoon Online Judge](https://www.acmicpc.net/), [ALGOSPOT](https://www.algospot.com/) 등의 Problem Solving (이하 "PS") 온라인 저지에서는 문제의 입력이 Standard Input(이하 "stdin")으로 주어지고, 정답을 Standard Output(이하 "stdout")으로 출력해야 하는 경우가 많습니다.

그에 반해, [Programmers](https://programmers.co.kr/), [LeetCode](https://leetcode.com/) 등은 문제의 입력을 함수의 인자로, 정답을 함수의 반환값으로 하고 있습니다.

solve&#46;io는 stdin/stdout를 기반으로 하는 PS 함수를 작성 후, 파일에 기재된 입력값을 넣어 실행한 결과값이 파일에 기재된 출력값과 일치하는지 검증하는 과정을 자동화하는 CLI입니다.

<!--
solve&#46;io는 stdin/stdout를 기반으로 하는 PS를 함수를 기반으로 하는 PS로 바꿔주는 역할을 합니다.

이를 통해 jest와 같은 테스트 프레임워크를 사용하여 PS를 할 수 있게 도와줍니다. -->

## 2. Usage

#### 1. javascript package 디렉토리로 이동하여 solve.io를 설치합니다

```sh
 cd path/to/js-package
 npm install -D @bigsaigon333/solve.io
```

#### 2. package.json의 scripts에 solve.io 를 추가합니다

```json
  "scripts": {
    "solve.io": "solve.io"
  }
```

#### 3. 문제를 풀 디렉토리를 다음과 같이 설정합니다

```sh
path/to/problem-directory
├── any_file_name_is_fine.js
├── a.in
├── a.out
├── b.in
└── b.out
```

- 디렉토리 내에 js파일은 단 하나여야 합니다. (파일명은 아무 파일명이나 상관없습니다.)
- stdin에 해당하는 파일은 확장자를 `.in`으로, stdout에 해당하는 파일은 확장자를 `.out`으로 설정하여야 합니다. 이 때, `*.in` 과 `*.out` 쌍이 맞아야 합니다.
  예시) `test1.in`, `test1.out`
- `*.in` 과 `*.out`의 쌍이 맞지 않는 파일은 무시됩니다.
  예시) `c.in` 만 존재하고 `c.out`은 없으면 `c.in`에 대한 테스트는 수행하지 않습니다.

#### 4. solve.io 실행

```sh
npm run solve.io path/to/problem-directory
```

##### ※ path/to/problem-directory 는 3가지 유형의 경로를 값으로 가질 수 있습니다

1. 절대경로

```sh
npm run solve.io /Users/bigsaigon333/github/path/to/problem-directory
```

2. package.json 을 기준으로 하는 상대경로

```sh
npm run solve.io path/to/problem-directory
```

3. 현재 디렉토리를 기준으로 하는 상대경로

```sh
cd path/to/problem-directory
npm run solve.io .
```

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

// a.in
1 2

// a.out
3
```

#### 디렉토리 구조

```sh
src/1000
├── 1000.js
├── a.in
└── a.out
```

#### solve.io 실행결과

```sh
npm run solve.io src/1000

> boj-with-js@0.1.0 solve.io
> solve.io src/1000

test case 1) PASSED

```

## 4. Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

```

```

/**
 * @params filePath - PS코드의 절대경로
 * @returns solve - 입력값을 인자로 받아 PS 코드 실행 결과를 string으로 반환하는 함수
 *
 * @example // BoJ 1000번 문제 풀이 1000.test.js
  const path = require("path");
  const genSolve = require("solve.io");
  const solve = genSolve(path.resolve(__dirname, "1000.js"));

  test("예제 1", async () => {
    const input = `1 2`;
    const output = `3
  `;

    expect(await solve(input)).toBe(output);
  });
 */
declare const generateSolve: (filePath: string) => (input: string) => Promise<string>;
export = generateSolve;

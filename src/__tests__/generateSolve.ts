import generateSolve from "../index";

describe("generateSolve", () => {
  test("filePath should be absollute path", () => {
    expect(() => generateSolve("")).toThrowError();

    expect(() => generateSolve("relative")).toThrowError();

    expect(() => generateSolve("../test/abc")).toThrowError();

    expect(() => generateSolve(__dirname)).not.toThrowError();
  });
});

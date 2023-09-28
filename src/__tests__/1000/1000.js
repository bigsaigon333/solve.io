// 1000.js
const answer = require("fs")
  .readFileSync(0, "utf-8")
  .split(" ")
  .map(Number)
  .reduce((a, b) => a + b);

console.log(answer);

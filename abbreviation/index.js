"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {
  if (!a || !b) {
    throw new Error("All parameters are required");
  }

  const arrA = a.split("");
  const arrB = b.split("");

  const hasUpper = (str) => {
    return /[A-Z]/.test(str);
  };

  //first filter if arrA has some upperCase letter, if yes take the letter, if not verify what letters in arrB are equals arrA
  const newArr = arrA.filter((itemA) =>
    hasUpper(itemA) ? true : arrB.some((itemB) => itemB === itemA.toUpperCase())
  );

  const result = newArr.map((item) => item.toUpperCase());

  //verify if both array are equals
  const isEquals = JSON.stringify(result) === JSON.stringify(arrB);

  return isEquals ? "YES" : "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const a = readLine();

    const b = readLine();

    const result = abbreviation(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}

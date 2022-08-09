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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
  if (!s) {
    throw new Error("All parameters are required");
  }

  const newArr = [];
  let maxLenght = 0;

  const uniqueElementsArray = [...new Set(s)];

  uniqueElementsArray.map((item, index, arr) => {
    const arrPart = arr.slice(index + 1);

    arrPart.map((it) => {
      newArr.push([item, it]);
    });
  });

  newArr.map((newArrItem) => {
    const result = [...s]
      .filter((value) => newArrItem.includes(value))
      .join("");

    if (result.match(/(.)\1/) === null) {
      maxLenght = Math.max(maxLenght, result.length);
    }
  });

  return maxLenght;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const l = parseInt(readLine().trim(), 10);

  const s = readLine();

  const result = alternate(s);

  ws.write(result + "\n");

  ws.end();
}

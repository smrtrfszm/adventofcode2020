const fs = require('fs')

const data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n')

const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]]

let b = Array(slopes.length).fill(0);
for (let j = 0; j < slopes.length; j++)
  for (let i = 0, a = 0; i < data.length; i += slopes[j][1], a += slopes[j][0])
    if (data[i][a % 31] === '#') b[j]++;

console.log(`1. feladat: ${b[1]}`)
console.log(`2. feladat: ${b.reduce((acc, a) => acc * a)}`)

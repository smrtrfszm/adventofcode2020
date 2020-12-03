const fs = require('fs')

const data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n')

let b = Array(5).fill(0);
for (let i = 0, a = 0; i < data.length; i++, a++)
  if (data[i][a % 31] === '#') b[0]++;
for (let i = 0, a = 0; i < data.length; i++, a += 3)
  if (data[i][a % 31] === '#') b[1]++;
for (let i = 0, a = 0; i < data.length; i++, a += 5)
  if (data[i][a % 31] === '#') b[2]++;
for (let i = 0, a = 0; i < data.length; i++, a += 7)
  if (data[i][a % 31] === '#') b[3]++;
for (let i = 0, a = 0; i < data.length; i+=2, a += 1)
  if (data[i][a % 31] === '#') b[4]++;

console.log(`1. feladat: ${b[1]}`)
console.log(`2. feladat: ${b.reduce((acc, a) => acc * a)}`)

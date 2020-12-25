const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => Number(x))

let a = 1

let i = 0
while (a !== data[0]) {
  a *= 7
  a %= 20201227
  i++
}

let p1 = 1
for (let j = 0; j < i; j++) {
  p1 *= data[1]
  p1 %= 20201227
}

console.log(`1. feladat: ${p1}`)
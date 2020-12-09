const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => Number(x))
let p1
for (let i = 0; i < data.length; i++) {
  let valid = false
  for (let j = 1; j <= 25; j++) {
    for (let k = 1; k <= 25; k++) {
      if (i < 25) {
        valid = true
        break
      }
      if (data[i] === data[i-j] + data[i-k]) {
        valid = true
      }
    }
    if (valid) break
  }

  if (!valid)
    p1 = data[i]
}

let p2

for (let i = 0; i < data.length; i++) {
  let a = 0
  let b = []
  let right = false
  for (let j = 1; j < data.length - i - 1; j++) {
    a += data[i+j]
    b.push(data[i+j])
    if (a === p1) {
      p2 = Math.min(...b) + Math.max(...b)
      right = true
    }
  }
  if (right) break
}

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)

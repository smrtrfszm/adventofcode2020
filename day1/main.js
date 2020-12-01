const fs = require('fs')

const data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n').map(x => Number(x))

let set1 = new Set()
let set2 = new Set()

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    if (data[i] + data[j] === 2020) {
      set1.add(data[i] * data[j])
    }
  }
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    for (let k = 0;  k < data.length; k++) {
      if (data[i] + data[j] + data[k] === 2020) {
        set2.add(data[i] * data[j] * data[k])
      }
    }
  }
}

console.log(`1. feladat: ${Array.from(set1)}`)
console.log(`2. feladat: ${Array.from(set2)}`)
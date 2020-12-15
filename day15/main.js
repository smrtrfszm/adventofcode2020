const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split(',').map(x => Number(x))

const add = (p1, a, i) => {
  const b = p1.get(a)
  if (b) {
    p1.set(a, [b[1], i])
  } else {
    p1.set(a, [null, i])
  }
  return a
}

const c = (n) => {
  let p1 = new Map()
  let last = 0

  for (let i = 0; i < n; i++) {
    if (i < data.length) {
      last = add(p1, data[i], i + 1)
      continue
    }
    const a = p1.get(last)
    if (a && a[0] === null) {
      last = add(p1, 0, i + 1)
    } else {
      let b = a[1] - a[0]
      last = add(p1, b, i + 1)
    }
  }

  return last
}

console.log(`1. feladat: ${c(2020)}`)
console.log(`2. feladat: ${c(30000000)}`)

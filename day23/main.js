const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('').map(x => Number(x))

const generateMap = (data2, n) => {
  let map = new Map()

  for (let i = 0; i < n; i++) {
    const k = (i < data.length) ? data[i] : i + 1
    const v = (i + 1 === n) ? data[0] : null
    map.set(k, v)

    const k2 = (i - 1 < data.length) ? data[i - 1] : i
    if (i !== 0) map.set(k2, k)
  }

  return map
}

const rounds = (map, n) => {
  const lo = 1
  const hi = map.size

  let currentCup = data[0]

  for (let i = 0; i < n; i++) {
    const a1 = map.get(currentCup)
    const a2 = map.get(a1)
    const a3 = map.get(a2)

    map.set(currentCup, map.get(a3))

    let dest = currentCup

    do {
      if (--dest < lo) {
        dest = hi
      }
    } while (dest === a1 || dest === a2 || dest === a3)

    let prev = map.get(dest)
    map.set(dest, a1)
    map.set(a1, a2)
    map.set(a2, a3)
    map.set(a3, prev)

    currentCup = map.get(currentCup)
  }

  return map
}

let map1 = rounds(generateMap(data, data.length), 100)
let map2 = rounds(generateMap(data, 1000000), 10000000)

let p1 = ''
let a = map1.get(1)
for (let i = 0; i < map1.size - 1; i++) {
  p1 += a
  a = map1.get(a)
}

const b1 = map2.get(1)
const b2 = map2.get(b1)

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${b1*b2}`)

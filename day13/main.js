const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n')

let time = Number(data[0])
let buses = data[1].split(',')

for (let i = time, a = true; a; i++) {
  for (const bus of buses) {
    if (i % bus === 0) {
      console.log(`1. feladat: ${bus * (i - time)}`)
      a = false
    }
  }
}

const inverse = (a, m) => {
  let m0 = m, x0 = 0n, x1 = 1n

  if (m === 1) return 0

  while (a > 1) {
    let q = a / m
    let t = m
    m = a % m
    a = t
    t = x0
    x0 = x1 - q * x0
    x1 = t
  }

  if (x1 < 0) x1 += m0

  return x1
}

let b = []
for (let i = 0; i < buses.length; i++) {
  if (buses[i] === 'x') continue
  const n1 = Number(buses[i])
  const n2 = (i % n1) ? n1 - (i % n1) : 0
  b.push([BigInt(n1), BigInt(n2)])
}

let prod = b.reduce((acc, x) => acc * x[0], 1n)
let result = b.reduce((acc, x) => {
  const pp = prod / x[0]
  return acc + x[1] * inverse(pp, x[0]) * pp
}, 0n)
const p2 = result % BigInt(prod)

console.log(`2. feladat: ${p2}`)
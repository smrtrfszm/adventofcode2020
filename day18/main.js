const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n')
const data2 = JSON.parse(JSON.stringify(data))


const solve = (input) => {
  const a = input.match(/[^()]+/g)[0]
  const split = a.split(' ')
  let b = BigInt(split[0])
  for (let i = 1; i < split.length; i+=2) {
    if (split[i] === '*') {
      b *= BigInt(split[i+1])
    } else if (split[i] === '+') {
      b += BigInt(split[i + 1])
    }
  }

  return b.toString()
}

const solve2 = (input) => {
  let a = input.match(/[^()]+/g)[0]
  let i = 0
  while (i < 2) {
    let matches
    if (i === 0) matches = a.match(/\d+ \+ \d+/g)
    if (i === 1) matches = a.match(/\d+ \* \d+/g)
    if (!matches) {
      i++
      continue
    }

    const solution = solve(matches[0])
    const find = matches[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    a = a.replace(new RegExp(find), solution)
  }

  return a
}

let p1 = 0n
let p2 = 0n

for (let i = 0; i < data.length; i++) {
  while (true) {
    const a = data[i].match(/\(([^()]+)\)/g)
    if (!a) break
    for (const b of a) {
      const solution = solve(b)
      const find = b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      data[i] = data[i].replace(new RegExp(find, 'g'), solution)
    }
  }
  p1 += BigInt(solve(data[i]))
}

for (let i = 0; i < data2.length; i++) {
  while (true) {
    const a = data2[i].match(/\(([^()]+)\)/g)
    if (!a) break
    for (const b of a) {
      const solution = solve2(b)
      const find = b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      data2[i] = data2[i].replace(new RegExp(find, 'g'), solution)
    }
  }
  const c = BigInt(solve2(data2[i]))
  p2 += c
}

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)
const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => Number(x))

let mem = {}
let max = Math.max(...data)
const data2 = [...data, max + 3]

const p2 = (jolts) => {
  if (jolts === max) return 1
  if (jolts in mem) return mem[jolts]

  let szam = 0
  for (let i = 1; i <= 3; i++) {
    const c = data2.find(x => x === jolts + i)
    if (c) {
      szam += p2(jolts + i)
    }
  }

  mem[jolts] = szam

  return szam
}

let jolt = 0

let a = 0
let b = 0

let asd = true
while (asd) {
  const c1 = data.find(x => x === jolt + 1)
  const c2 = data.find(x => x === jolt + 2)
  const c3 = data.find(x => x === jolt + 3)

  if (c1) {
    jolt += 1
    a++
    continue
  }

  if (c2) {
    jolt += 2
    continue
  }

  if (c3) {
    jolt += 3
    b++
    continue
  }

  if (!c1 && !c2 && !c3)
    asd = false
}

console.log(`1. feladat: ${a*(b+1)}`)
console.log(`2. feladat: ${p2(0)}`)
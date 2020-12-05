const fs = require('fs')

let p2 = 0
let data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n').map(x => {
  let c = [0, 7]
  let r = [0, 127]

  for (const a of x) {
    if (a === 'F') r[1] -= Math.floor((r[1] - r[0]) / 2) + 1
    if (a === 'B') r[0] += Math.floor((r[1] - r[0]) / 2) + 1
    if (a === 'L') c[1] -= Math.floor((c[1] - c[0]) / 2) + 1
    if (a === 'R') c[0] += Math.floor((c[1] - c[0]) / 2) + 1
  }

  return r[0] * 8 + c[0]
})

for (let i = 0; i <= 127*8+7; i++) {
    if (data.includes(i - 1) && data.includes(i + 1) && !data.includes(i)) p2 = i
}

console.log(`1. feladat: ${Math.max(...data)}`)
console.log(`2. feladat: ${p2}`)
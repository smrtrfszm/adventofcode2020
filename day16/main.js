const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n\n').map(x => x.split('\n'))

let a = {}
data[0].forEach(x => {
  const split = x.split(': ')

  const values = split[1].split(' or ')

  a[split[0]] = values.map(y => {
    return y.split('-').map(z => Number(z))
  })
})

let data2 = []

let p1 = 0
for (let i = 1; i < data[2].length; i++) {
  const split = data[2][i].split(',').map(x => Number(x))
  let c = 0
  for (const d of split) {
    let good = false
    for (const b of Object.values(a)) {
      if ((d >= b[0][0] && d <= b[0][1]) || (d >= b[1][0] && d <= b[1][1])) {
        good = true
      }
    }

    if (!good) {
      p1 += d
    } else {
      c++
    }
  }

  if (c === split.length) {
    data2.push(split)
  }
}

let ad = []

for (let b of data2) {
  for (let i = 0; i < b.length; i++) {
    const d = b[i]
    const good = []
    for (const [k, b] of Object.entries(a)) {
      if ((d >= b[0][0] && d <= b[0][1]) || (d >= b[1][0] && d <= b[1][1])) {
        good.push(k)
      }
    }

    if (ad[i]) {
      ad[i] = ad[i].filter(x => good.indexOf(x) !== -1)
    } else {
      ad[i] = good
    }
  }
}

const myTicket = data[1][1].split(',').map(x => Number(x))
let p2 = 1

for (let k = 0; k < ad.length; k++) {
  let i
  const aa = ad.find((x, j) => {
    if(x.length === 1) {
      i = j
      return true
    }
  })[0]

  if (aa.startsWith('departure')) {
    p2 *= myTicket[i]
  }

  for (let j = 0; j < ad.length; j++) {
    const index = ad[j].indexOf(aa)
    if (index !== -1)
      ad[j].splice(index, 1)
  }
}

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)
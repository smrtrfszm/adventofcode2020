const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  const split = x.split(' = ')
  const split2 = split[0].split('[')
  const type = split2[0]
  const addr = Number(split2[1]?.substring(0, split2[1].length - 1))
  return {type, addr, value: split[1]}
})

let p1 = {}
let p2 = {}
let mask = ''

for (let k = 0; k < data.length; k++) {
  const step = data[k]
  if (step.type === 'mask') {
    mask = step.value
    continue
  }

  let n = Number(step.value).toString(2)
  n = new Array(37).join('0').substr(n.length) + n

  let n2 = Number(step.addr).toString(2)
  n2 = new Array(37).join('0').substr(n2.length) + n2

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') continue
    const g = n.split('')
    g[i] = mask[i]
    n = g.join('')
  }

  p1[step.addr] = parseInt(n, 2)

  let j = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0') continue
    if (mask[i] === 'X') j++
    const g = n2.split('')
    g[i] = mask[i]
    n2 = g.join('')
  }

  for (let i = 0; i < 1 << j; i++) {
    const c = i.toString(2)
    let e = new Array(j + 1).join('0')
    e = e.substr(c.length) + c

    let addrS = n2
    let l = 0
    for (let j = 0; j < addrS.length; j++) {
      if (addrS[j] === 'X') {
        addrS = addrS.substring(0, j) + e[l++] + addrS.substring(j + 1);
      }
    }

    p2[parseInt(addrS, 2)] = Number(step.value)
  }
}

console.log(`1. feladat: ${Object.values(p1).reduce((acc, x) => acc + x)}`)
console.log(`2. feladat: ${Object.values(p2).reduce((acc, x) => acc + x)}`)

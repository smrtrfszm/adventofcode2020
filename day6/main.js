const fs = require('fs')

let p1 = 0, p2 = 0
fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n\n').forEach(x => {
  let set = new Set()
  for (const a of x.replace(/\n/g, ''))
    set.add(a)

  const length = x.split('\n').length
  let set2 = new Set()
  for (const a of x.replace(/\n/g, ''))
    if ((x.match(new RegExp(a, 'g')) || []).length === length)
      set2.add(a)

  p1 += set.size
  p2 += set2.size
})

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)
const fs = require('fs')

let p1 = 0, p2 = 0
fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n\n').forEach(x => {
  const b = x.split(/[ \n]/g).map(x => x.split(':'))
  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  let i = 0
  let k = 0
  for (const a of b) {
    if (fields.includes(a[0])) k++

    if (a[1].length === 4) {
      if (a[0] === 'byr' && Number(a[1] >= 1920) && Number(a[1]) <= 2002) i++
      if (a[0] === 'iyr' && Number(a[1] >= 2010) && Number(a[1]) <= 2020) i++
      if (a[0] === 'eyr' && Number(a[1] >= 2020) && Number(a[1]) <= 2030) i++
    }
    if (a[0] === 'hgt') {
      const c = a[1].substr(-2)
      const d = parseInt(a[1])
      if (c === 'cm' && Number(d) >= 150 && Number(d) <= 193) i++
      if (c === 'in' && Number(d) >= 59 && Number(d) <= 76) i++
    }
    if (a[0] === 'hcl' && a[1].match(/#[0-9a-f]{6}/)) i++
    if (a[0] === 'ecl') {
      const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      if (colors.includes(a[1])) i++
    }
    if (a[0] === 'pid' && a[1].length === 9) i++
  }

  if (k >= 7) p1++
  if (i >= 7) p2++

  return false
})

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)
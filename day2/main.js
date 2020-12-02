const fs = require('fs')

const data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n').map(x => {
  const split1 = x.split('-')
  const split2 = split1[1].split(' ')


  return {
    least: Number(split1[0]),
    max: Number(split2[0]),
    char: split2[1][0],
    pass: split2[2],
  }
})


let j = 0;
let l = 0;
for (const a of data) {
  let i = 0;
  for (const b of a.pass) {
    if (b === a.char) i++
  }

  if (i >= a.least && i <= a.max)
    j++

  if ((a.pass[a.least - 1] === a.char) + (a.pass[a.max - 1] === a.char) === 1)
    l++
}

console.log(`1. Feladat: ${j}`)
console.log(`2. Feladat: ${l}`)

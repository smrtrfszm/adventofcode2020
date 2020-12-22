const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n\n').map(x => x.match(/\d+$/gm).map(x => Number(x)))
let data2 = [...data.map(x => [...x])]

while (data[0].length && data[1].length) {
  const p1c = data[0].shift()
  const p2c = data[1].shift()
  if (p1c > p2c) {
    data[0].push(p1c, p2c)
  } else {
    data[1].push(p2c, p1c)
  }
}
console.log(`1. feladat: ${data.filter(x => x.length)[0].reverse().reduce((acc, x, i) => acc + x * (i+1))}`)

const rec = (cards) => {
  let set = new Set()
  while (cards[0].length && cards[1].length) {
    const state = cards.map(x => x.join(',')).join(':')
    if (set.has(state)) return 1
    set.add(state)

    const p1c = cards[0].shift()
    const p2c = cards[1].shift()

    let winner = p1c > p2c
    if (cards[0].length >= p1c && cards[1].length >= p2c) {
      const newCards = [
        cards[0].slice(0, p1c),
        cards[1].slice(0, p2c),
      ]
      winner = rec(newCards)
    }
    if (winner) {
      cards[0].push(p1c, p2c)
    } else {
      cards[1].push(p2c, p1c)
    }
  }
  return !!cards[0].length
}

rec(data2)

console.log(`2. feladat: ${data2.filter(x => x.length)[0].reverse().reduce((acc, x, i) => acc + x * (i+1))}`)

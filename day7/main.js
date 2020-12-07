const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  const split = x.split(' ')
  const color = split.slice(0, 2).join(' ')
  const contains = []
  for (let i = 4; i < split.length; i+=4) {
    const slice = split.slice(i, i + 3)
    const amount = slice[0]

    if (amount === 'no') break

    const color2 = slice.slice(1, 3).join(' ')
    contains.push({amount, color: color2})
  }
  return {color, contains}
})

let p1 = new Set()
const getBagColors = (color) => {
  if (p1.has(color)) return
  p1.add(color)
  const bags = data.filter(x => {
    return x.contains.filter(y => y.color === color).length > 0
  })

  for (const bag of bags){
    getBagColors(bag.color)
  }
}

let p2 = 0
const getCont = (color) => {
  const bags = data.filter(x => x.color === color)
  for (const bag of bags) {
    for (const elem of bag.contains) {
      for (let i = 0; i < elem.amount; i++) {
        p2++
        getCont(elem.color)
      }
    }
  }
}

getBagColors('shiny gold')
getCont('shiny gold')

console.log(`1. feladat: ${Array.from(p1).length-1}`)
console.log(`2. feladat: ${p2}`)
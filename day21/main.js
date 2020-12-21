const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  const ingredients = x.match(/.*(?= \()/g)[0].split(' ')
  const contains = x.match(/(?<=\(contains ).*(?=\))/g)[0].split(', ')
  return {ingredients, contains}
})

let set = new Set()

for (const line of data) {
  for (const c of line.contains) {
    set.add(c)
  }
}

let cs = {}

for (const s of set.values()) {
  let a = []
  for (const line of data) {
    if (line.contains.includes(s)) {
      if (!a.length)
        a.push(...line.ingredients)
      else
        a = a.filter(x => line.ingredients.includes(x))
    }
  }
  cs[s] = a
}

let p1 = 0
const valid = Object.values(cs).reduce((acc, x) => [...acc, ...x], [])

for (const line of data) {
  for (const i of line.ingredients) {
    if (!valid.includes(i)) {
      p1++
    }
  }
}

console.log(`1. feladat: ${p1}`)

let allergens = {}

for (let i = 0; i < Object.keys(cs).length; i++) {
  const keys = Object.keys(cs).filter(x => cs[x].length === 1)
  for (const key of keys) {
    const value = cs[key][0]
    allergens[key] = value
    for (let k of Object.keys(cs)) {
      if (cs[k].includes(value))
        cs[k].splice(cs[k].indexOf(value), 1)
    }
  }
}

console.log(`2. feladat: ${Object.entries(allergens).sort().map(x => x[1]).join(',')}`)

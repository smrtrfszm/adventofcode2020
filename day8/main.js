const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  const split = x.split(' ')
  return {instruction: split[0], arg: Number(split[1]), visited: false}
})

const solve = (instructions) => {
  let acc = 0
  let wrong = false
  for (let j = 0; j < instructions.length; j++) {
    const a = instructions[j]
    if (a.visited) {
      wrong = true
      break
    }

    a.visited = true
    if (a.instruction === 'nop') continue
    if (a.instruction === 'acc') acc += a.arg
    if (a.instruction === 'jmp') j += a.arg - 1
  }

  if (wrong) return {error: true, value: acc}
  return {error: false, value: acc}
}

console.log(`1. feladat: ${solve(JSON.parse(JSON.stringify(data))).value}`)

for (let i = 0; i < data.length; i++) {
  if (data[i].instruction === 'acc') continue

  const instructions = JSON.parse(JSON.stringify(data))
  instructions[i].instruction = (instructions[i].instruction === 'nop') ? 'jmp' : 'nop'

  let result = solve(instructions)
  if (!result.error) {
    console.log(`2. feladat: ${result.value}`)
  }
}
const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  let data2 = []
  const split = x.split('')

  for (let i = 0; i < split.length; i++) {
    if (split[i] === 'e' || split[i] === 'w') {
      data2.push(split[i])
    } else if (split[i] === 'n' || split[i] === 's') {
      data2.push([split[i], split[i+1]].join(''))
      i++
    }
  }

  return data2
})

const longest = data.reduce((acc, x) => (x.length > acc) ? x.length : acc, 0)
let grid = new Array(1+2*longest+200).fill(new Array(1+2*longest+200).fill(new Array(1+2*longest+200).fill('W')))
grid = JSON.parse(JSON.stringify(grid))


for (const row of data) {
  let x = longest + 1 + 100
  let y = longest + 1 + 100
  let z = longest + 1 + 100

  for (const direction of row) {
    switch (direction) {
      case 'e':
        x++
        y--
        break
      case 'w':
        x--
        y++
        break
      case 'se':
        z++
        y--
        break
      case 'sw':
        x--
        z++
        break
      case 'ne':
        x++
        z--
        break
      case 'nw':
        z--
        y++
        break
    }
  }

  if (grid[x][y][z] === 'W') grid[x][y][z] = 'B'
  else if (grid[x][y][z] === 'B') grid[x][y][z] = 'W'
}

let p1 = 0

for (let x = 0; x < 1 + 2 * longest + 200; x++)
  for (let y = 0; y < 1 + 2 * longest + 200; y++)
    for (let z = 0; z < 1 + 2 * longest + 200; z++)
      if (grid[x][y][z] === 'B') p1++

console.log(`1. feladat: ${p1}`)

for (let i = 0; i < 100; i++) {
  const state = JSON.parse(JSON.stringify(grid))

  for (let x = 0; x < 1 + 2 * longest + 200; x++)
    for (let y = 0; y < 1 + 2 * longest + 200; y++)
      for (let z = 0; z < 1 + 2 * longest + 200; z++)
        if (x + y + z === (longest + 1 + 100)*3) {
          let a = 0

          if (grid[x+1] && grid[x+1][y-1] && grid[x+1][y-1][z] === 'B') a++
          if (grid[x-1] && grid[x-1][y+1] && grid[x-1][y+1][z] === 'B') a++
          if (grid[x] && grid[x][y-1] && grid[x][y-1][z+1] === 'B') a++
          if (grid[x-1] && grid[x-1][y] && grid[x-1][y][z+1] === 'B') a++
          if (grid[x+1] && grid[x+1][y] && grid[x+1][y][z-1] === 'B') a++
          if (grid[x] && grid[x][y+1] && grid[x][y+1][z-1] === 'B') a++

          if (grid[x][y][z] === 'B' && (a === 0 || a > 2)) {
            state[x][y][z] = 'W'
          }
          if (grid[x][y][z] === 'W' && a === 2) {
            state[x][y][z] = 'B'
          }
        }

  grid = state
}

let p2 = 0

for (let x = 0; x < 1 + 2 * longest + 200; x++)
  for (let y = 0; y < 1 + 2 * longest + 200; y++)
    for (let z = 0; z < 1 + 2 * longest + 200; z++)
      if (grid[x][y][z] === 'B') p2++

console.log(`2. feladat: ${p2}`)
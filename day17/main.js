const fs = require('fs')

const data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => x.split(''))

const cycles = 6
let cube = {}
let cube2 = {}

for (let w = -cycles; w <= cycles; w++) {
  cube2[w] = {}
  for (let z = -cycles; z <= cycles; z++) {
    cube[z] = new Array(data.length + 2*cycles).fill(new Array(data[0].length + 2*cycles).fill('.'))
    cube2[w][z] = new Array(data.length + 2*cycles).fill(new Array(data[0].length + 2*cycles).fill('.'))
  }
}
cube = JSON.parse(JSON.stringify(cube))
cube2 = JSON.parse(JSON.stringify(cube2))

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    cube[0][cycles + i][cycles + j] = data[i][j]
    cube2[0][0][cycles + i][cycles + j] = data[i][j]
  }
}

for (let n = 0; n < cycles; n++) {
  const state = JSON.parse(JSON.stringify(cube))
  const state2 = JSON.parse(JSON.stringify(cube2))
  for (let w = -cycles; w <= cycles; w++)
    for (let z = -cycles; z <= cycles; z++)
      for (let y = 0; y < cube2[0][0].length; y++)
        for (let x = 0; x < cube2[0][0][0].length; x++) {
          let a = 0;
          let a2 = 0;
          for (let i = -1; i <= 1; i++)
            for (let j = -1; j <= 1; j++)
              for (let k = -1; k <= 1; k++)
                for (let l = -1; l <= 1; l++)
                  if (i !== 0 || j !== 0 || k !== 0 || l !== 0) {
                    if (i === 0 && cube[j + z] && cube[j + z][k + y] && cube[j + z][k + y][l + x])
                      if (cube[j + z][k + y][l + x] === '#') a++
                    if (cube2[i + w] && cube2[i + w][j + z] && cube2[i + w][j + z][k + y] && cube2[i + w][j + z][k + y][l + x])
                      if (cube2[i + w][j + z][k + y][l + x] === '#') a2++
                  }

          const b = cube[z][y][x]
          const b2 = cube2[w][z][y][x]
          if (b === '.' && a === 3) state[z][y][x] = '#'
          if (b === '#' && a !== 2 && a !== 3) state[z][y][x] = '.'
          if (b2 === '.' && a2 === 3) state2[w][z][y][x] = '#'
          if (b2 === '#' && a2 !== 2 && a2 !== 3) state2[w][z][y][x] = '.'
        }
  cube = state
  cube2 = state2
}
let p1 = 0
let p2 = 0

for (let w = -cycles; w <= cycles; w++) {
  for (let z = -cycles; z <= cycles; z++) {
    for (let y = 0; y < cube2[0][0].length; y++) {
      for (let x = 0; x < cube2[0][0][0].length; x++) {
        if (w === 0 && cube[z][y][x] === '#') p1++
        if (cube2[w][z][y][x] === '#') p2++
      }
    }
  }
}

console.log(`1. feladat: ${p1}`)
console.log(`2. feladat: ${p2}`)
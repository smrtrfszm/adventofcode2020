const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n').map(x => {
  const dir = x[0]
  const dist = Number(x.substr(1, x.length))
  return {dir, dist}
})

const dirs = {
  'E': {x: 1, y:0, R: 'S', L: 'N'},
  'W': {x: -1, y:0, R: 'N', L: 'S'},
  'S': {x: 0, y:-1, R: 'W', L: 'E'},
  'N': {x: 0, y:1, R: 'E', L: 'W'},
}

let dir = 'E'
let p1x = 0, p1y = 0
let x = 10, y = 1
let sx = 0, sy = 0

for (const a of data) {
  if (a.dir === 'R') {
    for (let i = a.dist; i > 0; i -= 90) {
      dir = dirs[dir].R
      const b = x
      x = y
      y = -b
    }
  } else if (a.dir === 'L') {
    for (let i = a.dist; i > 0; i -= 90) {
      dir = dirs[dir].L
      const b = x
      x = -y
      y = b
    }
  }

  if (a.dir === 'F') {
    sx += x * a.dist
    sy += y * a.dist
    p1x += dirs[dir].x * a.dist
    p1y += dirs[dir].y * a.dist
  } else if (a.dir !== 'L' && a.dir !== 'R') {
    x += dirs[a.dir].x * a.dist
    y += dirs[a.dir].y * a.dist
    p1x += dirs[a.dir].x * a.dist
    p1y += dirs[a.dir].y * a.dist
  }
}

console.log(`1. feladat: ${Math.abs(p1x) + Math.abs(p1y)}`)
console.log(`2. feladat: ${Math.abs(sx) + Math.abs(sy)}`)


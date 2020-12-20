const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n\n').map(x => {
  const split = x.split('\n')
  const id = Number(split[0].match(/\d+/g)[0])
  const d = split.splice(1, split.length)

  return {id, data: d}
})

const getTop = (tile) => tile.data[0]
const getBottom = (tile) => tile.data[tile.data.length - 1]
const getRight = (tile) => tile.data.join('\n').match(/.$/gm).join('')
const getLeft = (tile) => tile.data.join('\n').match(/^./gm).join('')

const rotateTile = (tile) => {
  let o = Object.assign({}, tile)
  const array = tile.data.map(x => x.split(''))
  const modified = array[0].map((_, index) => array.map(x => x[index]))
  o.data = modified.map(x => x.reverse().join(''))
  return o
}

const flipTile = (tile) => {
  let o = Object.assign({}, tile)
  o.data = o.data.map(x => x.split('').reverse().join(''))
  return o
}

const getAllState = (tile) => {
  let a = []
  a.push(tile)
  a.push(rotateTile(a[a.length - 1]))
  a.push(rotateTile(a[a.length - 1]))
  a.push(rotateTile(a[a.length - 1]))
  a.push(flipTile(a[a.length - 1]))
  a.push(rotateTile(a[a.length - 1]))
  a.push(rotateTile(a[a.length - 1]))
  a.push(rotateTile(a[a.length - 1]))
  return a
}

const simplyfyGrid = (grid2) => {
  const cwidth = grid2[0][0].data.length - 2
  const swidth = grid2.length * cwidth
  let sgrid = new Array(swidth).fill(new Array(swidth))
  sgrid = JSON.parse(JSON.stringify(sgrid))
  

  for (const [y, row] of grid2.entries()) {
    for (const [x, cell] of row.entries()) {
      for (let i = 1; i < cell.data.length - 1; i++) {
        for (let j = 1; j < cell.data[i].length - 1; j++) {
          sgrid[y * cwidth + i - 1][x * cwidth + j - 1] = cell.data[i][j]
        }
      }
    }
  }

  sgrid = sgrid.map(x => x.join(''))

  return sgrid
}

const rotateGrid = (grid2) => {
  const array = grid2.map(x => x.split(''))
  const modified = array[0].map((_, index) => array.map(x => x[index]))
  return modified.map(x => x.reverse().join(''))
}

const flipGrid = (grid2) => {
  return grid2.map(x => x.split('').reverse().join(''))
}

const getAllGrids = (grid2) => {
  let a = []
  a.push(grid2)
  a.push(rotateGrid(a[a.length - 1]))
  a.push(rotateGrid(a[a.length - 1]))
  a.push(rotateGrid(a[a.length - 1]))
  a.push(flipGrid(a[a.length - 1]))
  a.push(rotateGrid(a[a.length - 1]))
  a.push(rotateGrid(a[a.length - 1]))
  a.push(rotateGrid(a[a.length - 1]))
  return a
}

const monster = ['                  # ',
                 '#    ##    ##    ###',
                 ' #  #  #  #  #  #   ']

const mw = monster[0].length
const mh = monster.length

const patterns = monster.map(x => new RegExp(x.replace(/ /g, '.')))

const part2 = (grid2) => {
  for (const g of getAllGrids(grid2)) {
    let b = 0
    for (let i = 0; i < g.length - mh; i++) {
      for (let j = 0; j < g[i].length - mw; j++) {
        let a = 0
        for (let k = 0; k < mh; k++)
          if ((g[i+k].substr(j, mw).match(patterns[k]) || []).length) a++
        if (a === 3)
          b++
      }
    }
    if (b) {
      const numhash = g.join().match(/#/g).length
      const numhashmonster = monster.join().match(/#/g).length
      console.log(`2. feladat: ${numhash - numhashmonster * b}`)
      break
    }
  }
}

let width = Math.sqrt(data.length)
let used = new Set()
let grid = new Array(width).fill(new Array(width).fill(null))
grid = JSON.parse(JSON.stringify(grid))

const fd = (row, column) => {
  if (row === grid.length) {
    console.log(`1. feladat: ${grid[0][0].id * grid[0][width-1].id * grid[width-1][0].id * grid[width-1][width-1].id}`)
    part2(simplyfyGrid(grid))
    process.exit(0)
  }

  for (let tile of data) {
    if (used.has(tile.id))
      continue
    for (let rot of getAllState(tile)) {
      wrong = false
      if (row > 0) {
        if (getTop(rot) !== getBottom(grid[row-1][column])) wrong = true 
      }
      if (column > 0)
        if (getLeft(rot) !== getRight(grid[row][column-1])) wrong = true 
      if (!wrong) {
        grid[row][column] = rot
        used.add(tile.id)
        if (column + 1 === grid[row].length)
          fd(row + 1, 0) 
        else
          fd(row, column + 1)
        used.delete(tile.id)
      }
    }
  }
}

fd(0, 0)


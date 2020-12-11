const fs = require('fs')

let origianlData = fs.readFileSync('data.txt', {encoding: 'utf8'}).split('\n')

let data = JSON.parse(JSON.stringify(origianlData))
let data2 = JSON.parse(JSON.stringify(origianlData))

let change = false

const round = () => {
  for (let j = 0; j < data2.length; j++) {
    for (let i = 0; i < data2[j].length; i++) {
      if (data2[j][i] === '.') continue
      let adj = 0;
      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++)
          if (l !== 0 || k !== 0)
            if (data[j + k] && data[j + k][i + l] === '#') adj++

      if (adj === 0 && data[j][i] === 'L') {
        data2[j] = data2[j].substring(0, i) + '#' + data2[j].substring(i + 1);
        change = true
      }
      if (adj >= 4 && data[j][i] === '#') {
        data2[j] = data2[j].substring(0, i) + 'L' + data2[j].substring(i + 1);
        change = true
      }
    }
  }
}

const round2 = () => {
  for (let j = 0; j < data2.length; j++) {
    for (let i = 0; i < data2[j].length; i++) {
      if (data2[j][i] === '.') continue
      let adj = 0;
      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++)
          if (l !== 0 || k !== 0)
            for (let m = 1; ; m++) {
              if (!data[j + k * m]) break
              const seat = data[j + k * m][i + l * m]
              if (!seat || seat === 'L') break;
              if (seat === '#') {
                adj++
                break
              }
            }

      if (adj === 0 && data[j][i] === 'L') {
        data2[j] = data2[j].substring(0, i) + '#' + data2[j].substring(i + 1);
        change = true
      }
      if (adj >= 5 && data[j][i] === '#') {
        data2[j] = data2[j].substring(0, i) + 'L' + data2[j].substring(i + 1);
        change = true
      }
    }
  }
}

do {
  change = false
  round()
  data = JSON.parse(JSON.stringify(data2))
} while (change)

console.log(`1. feladat: ${JSON.stringify(data2).match(/#/g).length}`)

data = JSON.parse(JSON.stringify(origianlData))
data2 = JSON.parse(JSON.stringify(origianlData))

do {
  change = false
  round2()
  data = JSON.parse(JSON.stringify(data2))
} while (change)

console.log(`2. feladat: ${JSON.stringify(data2).match(/#/g).length}`)

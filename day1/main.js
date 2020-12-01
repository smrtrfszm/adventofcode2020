const fs = require('fs')

const data = fs.readFileSync('data.txt', { encoding: 'utf8' }).split('\n').map(x => Number(x))

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    for (let k = 0;  k < data.length; k++) {
      if (data[i] + data[j] + data[k] === 2020) {
        console.log(data[i] * data[j] * data[k])
      }
    }
  }
}
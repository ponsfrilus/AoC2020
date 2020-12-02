const { readFileSync } = require('fs')

const day = process.argv.slice(2)
if (day.length == 0 || day[0] < 1 || day[0] > 31) {
  console.error('Please specify the day...')
  process.exit()
}
console.log(
  'Processing day: ',
  day[0].padStart(2, '0'),
  `\t→ https://adventofcode.com/2020/day/${day[0]}`
)

// Generically load the run function of the day and pass input array
const input = readFileSync(`./day${day[0].padStart(2, '0')}/input.txt`)
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n')
const run = require(`./day${day[0].padStart(2, '0')}/index.js`).run
run(input)

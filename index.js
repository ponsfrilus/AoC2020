const { readFileSync, existsSync } = require('fs')
const utils = require('./utils.js')

const day = process.argv.slice(2)
if (day.length == 0 || (isNaN(parseInt(day[0])) && day[0] != 'all') || (!isNaN(parseInt(day[0])) && (parseInt(day[0]) < 1 || parseInt(day[0]) > 31))) {
  console.error(`Please specify a valid day or use "all"... ${day}`)
  process.exit()
}

const mode = process.argv.slice(3)
if (mode == 'create' && day[0] != 'all') {
  utils.createDay(day[0])
  process.exit()
}

const runDay = (day) => {
  console.log(`---------------------------------------------------------------`)
  console.log(
    'Processing day: ',
    day,
    `\t→ https://adventofcode.com/2020/day/${day}`
  )

  let dir = `./day${day.toString().padStart(2, '0')}`
  if (!existsSync(dir)) {
    console.error(`${dir}: not found`)
    process.exit()
  }

  // Generically load the run function of the day and pass input array
  const input = readFileSync(`${dir}/input.txt`)
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
  const run = require(`${dir}/index.js`).run
  run(input)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Sequence_generator_range
// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

if (day[0] == 'all') {
  range(1, 31, 1).forEach((i) => {
    runDay(i)
  })
  console.log(`---------------------------------------------------------------`)
} else {
  runDay(day[0])
  console.log(`---------------------------------------------------------------`)
}


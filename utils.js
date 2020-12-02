const fs = require('fs')

exports.createDay = (day) => {
  let dir = `./day${day.padStart(2, '0')}`
  createDayDirectory(dir)
  createDayInputFile(dir, day)
  createDayIndexFile(dir, day)
}

const createDayDirectory = (dir) => {
  try {
    fs.mkdirSync(dir)
  } catch (e) {
    console.error(`Problem creating ${dir}: ${e}`)
  }
}

const createDayInputFile = (dir, day) => {
  let file = `${dir}/input.txt`
  let dummyData = `Please replace me with the content of https://adventofcode.com/2020/day/${day}/input`
  createFile(file, dummyData)
}

const createDayIndexFile = (dir, day) => {
  let file = `${dir}/index.js`
  let dummyData = `// Solution for https://adventofcode.com/2020/day/${day}
const run = (input) => {
  console.debug(input)
}
exports.run = run
`
  createFile(file, dummyData)
}

const createFile = (path, content) => {
  try {
    if (fs.existsSync(path)) {
      console.error(`Problem creating ${path}: already exists`)
    } else {
      fs.writeFileSync(path, content, (e) => {
        if (e) throw e
        console.log(`File ${path} is created successfully.`)
      })
    }
  } catch (e) {
    console.error(`Problem creating ${path}: ${e}`)
  }
}

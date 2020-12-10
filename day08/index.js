// Solution for https://adventofcode.com/2020/day/8
const run = (input) => {
  console.log('Solution part 1:', loopData(input, false))

  // Part 2
  let all = []
  for (let i = 0; i < input.length; i++) {
    let { instruction, entry } = parseOperation(input[i])
    if (instruction == 'nop') {
      input[i] = 'jmp ' + entry
      all.push([...input])
      input[i] = 'nop ' + entry
    }
    if (instruction == 'jmp') {
      input[i] = 'nop ' + entry
      all.push([...input])
      input[i] = 'jmp ' + entry
    }
  }

  for (let data of all) {
    loopData(data, true)
  }
}
exports.run = run

const loopData = (data, part2) => {
  let accumulator = 0
  var steps = []
  let index = 0

  while (true) {
    if (part2 && data.length == index) {
      console.log('Solution part 2:', accumulator)
      break
    }
    let { instruction, value } = parseOperation(data[index])

    if (typeof steps[index] == 'undefined') {
      steps[index] = 0
    }
    steps[index] += 1
    if (steps[index] > 1) {
      if (!part2) {
        return accumulator
      }
      break
    }

    switch (instruction) {
      case 'acc':
        accumulator += value
        index += 1
        break
      case 'jmp':
        index += value
        break
      case 'nop':
        index += 1
      default:
        break
    }
  }
}

const parseOperation = (op) => {
  let parsed = /^(nop|acc|jmp) (.)(\d*)$/.exec(op)
  return {
    instruction: parsed[1],
    value: parseInt(parsed[2] + parsed[3]),
    entry: parsed[2] + '' + parsed[3],
  }
}

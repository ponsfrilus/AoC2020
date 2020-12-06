// Solution for https://adventofcode.com/2020/day/6
const run = (input) => {
  let solution1 = 0
  let solution2 = 0
  inputs = formatData(input)
  let part1 = []
  for (let dec of inputs[0]) {
    // https://stackoverflow.com/a/37932364
    let dedup = String.prototype.concat(...new Set(dec))
    part1.push(dedup)
    solution1 += dedup.length
  }

  let sol2 = []
  for (let i in part1) {
    sol2[i] = 0
    for (let char of part1[i]) {
      let test = true
      for (let dec of inputs[1][i]) {
        if (!dec.includes(char)) {
          test = false
        }
      }
      if (test) {
        sol2[i] += 1
      }
    }
  }
  solution2 = sol2.reduce((a, b) => a + b, 0)
  console.log('Solution part 1:', solution1)
  console.log('Solution part 2:', solution2)
}
exports.run = run

const formatData = (data) => {
  data = data.join("\n")
  let declaration = data.split(/\n\n/);
  let input1 = []
  let input2 = []
  for (let i=0; i < declaration.length; i++) {
    keysValues = declaration[i].split(" ").join("\n").split(/\n/)
    input1.push(keysValues.join(''))
    input2.push(keysValues)
  }
  return [input1, input2]
}
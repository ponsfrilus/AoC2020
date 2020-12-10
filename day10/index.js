// Solution for https://adventofcode.com/2020/day/10
const run = (input) => {
  let data = []
  input = input.map((j) => parseInt(j))
  input.push(Math.max(...input)+3)
  input.sort((a, b) => a - b)
  input = [ ...new Set(input)] 

  let init = 0
  let one = 0
  let three = 0
  for (let j=0; j < input.length; j++) {
    init = input[j] - (input[j-1] || 0)
    if (init > 3) break
    if (init == 3) {
      three++
    }
    if (init == 1) {
      one++
    }
  }
  let solution1 = one * three
  console.log('Solution part1:', solution1)
}
exports.run = run

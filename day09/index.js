// Solution for https://adventofcode.com/2020/day/9
const run = (input) => {
  const preamble_size = 25
  let solution1 = 0

  fullloop: for (let i = 0; i < input.length; i++) {
    let objectif = input[i + preamble_size]
    if (typeof objectif == 'undefined') {
      break
    }
    let currentSlice = input.slice(i, i + preamble_size)
    let preamble = false
    let loop_count = 0
    for (let index in currentSlice) {
      let A = currentSlice[index]
      loop_count++
      for (let i = ++index; i < currentSlice.length; i++) {
        if (parseInt(A) + parseInt(currentSlice[i]) == objectif) {
          preamble = true
          break
        }
      }
      if (preamble) {
        continue
      }
      if (loop_count == preamble_size) {
        solution1 = parseInt(objectif)
        console.log('Solution part 1:', solution1)
        break fullloop
      }
    }
  }

  let solution2 = 0
  let index = 0
  while (solution2 < solution1) {
    solution2 = 0
    for (let i = index; i < input.length; i++) {
      solution2 = solution2 + parseInt(input[i])
      if (solution2 > solution1) {
        solution2 = 0
        break
      }
      if (solution2 == solution1) {
        let sol2 = input.slice(index, i + 1)
        console.log('Solution part 2:', Math.min(...sol2) + Math.max(...sol2))
        break
      }
    }
    index++
  }
}
exports.run = run

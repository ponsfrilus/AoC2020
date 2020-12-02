const run = (input) => {
  part1: for (let i = 0; i <= input.length; i++) {
    for (let j = i; j <= input.length; j++) {
      let ii = parseInt(input[i])
      let jj = parseInt(input[j])
      if (ii + jj == 2020) {
        console.log('Solution part 1:', ii * jj)
        break part1
      }
    }
  }

  part2: for (let i = 0; i <= input.length; i++) {
    for (let j = i; j <= input.length; j++) {
      for (let k = i; k <= input.length; k++) {
        let ii = parseInt(input[i])
        let jj = parseInt(input[j])
        let kk = parseInt(input[k])
        if (ii + jj + kk == 2020) {
          console.log('Solution part 2:', ii * jj * kk)
          break part2
        }
      }
    }
  }
}
exports.run = run

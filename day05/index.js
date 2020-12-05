// Solution for https://adventofcode.com/2020/day/5
const run = (input) => {
  let solution1 = 0
  let solution2 = 0

  let plane = []
  let seat = []
  for (let r=0; r<128; r++) {
      if (typeof(plane[r]) == 'undefined') { plane[r] = [] }
      if (typeof(seat[r]) == 'undefined') { seat[r] = [] }
      for (let c=0; c<8; c++) {
        plane[r][c] = 0
        seat[r][c] = 0
      }
  }

  for (let i=0; i< input.length; i++) {
    let rowA = 0
    let rowB = 127
    let colA = 0
    let colB = 7
    let result = 0
    let currentLine = input[i]
    for (let j=0; j< currentLine.length; j++) {
      let char = currentLine[j]
      if (char == "F") {
        result = (rowA + (rowB-1)) / 2
        rowB = result
      } else if (char == "B") { 
        result = ((rowA+1) + rowB) / 2
        rowA = result
      } else if (char == "L") { 
        result = (colA + (colB -1)) / 2
        colB = result
      } else if (char == "R") { 
        result = ((colA+1) + colB) / 2
        colA = result
      }
    }
    let seatID = rowA * 8 + colA
    plane[rowA][colA] = seatID
    solution1 = (solution1 < seatID) ? seatID : solution1
  }

  for (let i in plane) {
    for (let j=0; j<plane.length; j++) {
      if (plane[i][j] == 0) {
        seatId = plane[i][j]
        seatIdNext = plane[i][j+1]
        seatIdPrev = plane[i][j-1]

       if ( (typeof(seatIdPrev) !== 'undefined' || typeof(seatIdNext) !== 'undefined')
            && (seatIdNext != 0 && seatIdPrev != 0)) {
          if (seatIdNext - 1 > 1) {
            solution2 = seatIdNext - 1
          } else if (seatIdPrev + 1 > 1) {
            solution2 = seatIdPrev + 1
          } 
        } 
      }
    }
  }

  console.log('Solution part 1:', solution1)
  console.log('Solution part 2:', solution2)

}
exports.run = run

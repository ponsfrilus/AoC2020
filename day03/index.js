// Solution for https://adventofcode.com/2020/day/3
var treesTotal = 0
var solution2 = 1
const run = (input) => {

  // Hugly big huge playground
  let size = input.length * 7
  input = repeatLine(input, size)

  let slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]]
  for (let slope of slopes) {
    treesTotal = 0
    let tmpInput = [...input]
    followSlope(tmpInput, 0, 0, slope[0], slope[1])
    //console.debug(tmpInput)
    //console.debug("Trees found:", treesTotal)
    if (slope[0] == 3 && slope[1] == 1) {
      console.log("Solution part 1:", treesTotal)
    }
    //console.debug("\n--------------------------------\n")
    solution2 = solution2 * treesTotal
  }
  console.log("Solution part 2:", solution2)
}
exports.run = run


function repeatLine(arr, num) {
  for (let line in arr) {
    arr[line] = arr[line].repeat(num)
  }
  return arr
}

function followSlope(input, posx, posy, slopex, slopey) {
  posy += slopey
  posx += slopex
  if (typeof(input[posy]) == 'undefined' || typeof(input[posy][posx]) == 'undefined') {
    // exit condition
    return input
  }
  if (input[posy][posx] == '#') {
    let tmp = input[posy].split('')
    tmp[posx] = 'X'
    input[posy] = tmp.join('')
    treesTotal++
  } else {
    let tmp = input[posy].split('')
    tmp[posx] = 'O'
    input[posy] = tmp.join('')
  }
  return followSlope(input, posx, posy, slopex, slopey)
}
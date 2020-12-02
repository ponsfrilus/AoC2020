exports.run = (input) => {
  let result_part_1 = 0
  let result_part_2 = 0

  for (let raw of input) {
    let data = raw.split(':')
    let rules = data[0].split(' ')
    let rule = rules[0].split('-')
    let min = rule[0]
    let max = rule[1]
    let letter = rules[1]
    let password = data[1]

    result_part_1 = validationPart1(result_part_1, password, letter, min, max)
    result_part_2 = validationPart2(result_part_2, password, letter, min, max)
  }
  console.log('Solution part 1:', result_part_1)
  console.log('Solution part 2:', result_part_2)
}

function validationPart1(result, password, letter, min, max) {
  let nbOcc = occurencesNumber(password, letter)
  if (nbOcc >= min && nbOcc <= max) {
    result++
  }
  return result
}

function validationPart2(result, password, letter, min, max) {
  if ((password[min] == letter) ^ (password[max] == letter)) {
    result++
  }
  return result
}

function occurencesNumber(password, letter) {
  var indices = 0
  for (var i = 0; i < password.length; i++) {
    if (password[i] === letter) indices++
  }
  return indices
}

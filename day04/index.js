// Solution for https://adventofcode.com/2020/day/4
const run = (input) => {
  let solution1 = 0
  let solution2 = 0
  input = input.join("\n")
  input = formatData(input)
  for (let i = 0; i<input.length; i++) {
    let len = Object.keys(input[i]).length
    if (len == 8 || (len == 7 && !("cid" in input[i]))) {
      solution1++
      if (validatePassport(input[i])) {
        solution2++
      }
    }
  }
  console.log("Solution part 1:", solution1)
  console.log("Solution part 2:", solution2)
}
exports.run = run

const validatePassport = (pass) => {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if (pass.byr.length != 4 || pass.byr < 1920 ||  pass.byr > 2002) {
    return false
  }
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if (pass.iyr.length != 4 || pass.iyr < 2010 ||  pass.iyr > 2020) {
    return false
  }
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if (pass.eyr.length != 4 || pass.eyr < 2020 ||  pass.eyr > 2030) {
    return false
  }
  /*
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
  */
  const regex = /(\d{1,3})(cm|in)/gm;
  let matches = regex.exec(pass.hgt)
  if (!pass.hgt.match(regex)) {
    return false
  } else {
    if (matches[2] == 'cm' && (matches[1] < 150 || matches[1] > 193 )) {
      return false
    }
    if (matches[2] == 'in' && (matches[1] < 59 || matches[1] > 76 )) {
      return false
    }
  }
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if (!pass.hcl.match(/^#[0-9a-f]{6}$/)) {
    return false
  }
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  if (!pass.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) {
    return false
  }
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (!pass.pid.match(/^\d{9}$/)) {
    return false
  }
  return true
}

const formatData = (data) => {
  let passwords = data.split(/\n\n/);
  let input = []
  for (let i=0; i < passwords.length; i++) {
    keysValues = passwords[i].split(" ").join("\n").split(/\n/)
    let obj = {}
    keysValues.map((keyValue) => {
      let keyValueSplitted = keyValue.split(":")
      obj[keyValueSplitted[0]] = keyValueSplitted[1]
      return obj
    })
    input.push(obj)
  }
  return input
}
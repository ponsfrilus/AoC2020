// Solution for https://adventofcode.com/2020/day/7
const run = (input) => {
  let lines = cleanUpBags(input)
  let solution1 = []
  bagColor = 'shiny gold'
  let sollength = -1
  while (solution1.length != sollength) {
    solution1 = searchElement(lines, bagColor, solution1)
    sollength = solution1.length
    for (let solution of solution1) {
      solution1 = searchElement(lines, solution, solution1)
    }
  }

  let allBags = []
  for (line of input) {
    let { bagParent, bagChildren } = parseBagParentAndChildren(line)
    let objBag = createBag(bagParent, bagChildren)
    allBags.push(objBag)
  }

  let solution2 = runTree(allBags, 'shiny gold')
  console.log('Solution part 1:', solution1.length)
  console.log('Solution part 2:', solution2)
}

const searchElement = (lines, lookupBagColor, solutions)=> {
  for (const [parentBag, childBags] of Object.entries(lines)) {
    for (let bag of childBags) {
      let bagInfo = /^(\d*) (.*) bag(s)?/.exec(bag)
      let bagColor = bagInfo[2]

      if (lookupBagColor.startsWith(bagColor)) {
        if (!solutions.includes(parentBag)) {
          solutions.push(parentBag)
        }
      }
    }
  }
  return solutions
}

const cleanUpBags = (lines, currentBag = 'shiny gold bags') => {
  let list = {}

  // remove bags that contains nothing
  for (let line of lines) {
    let bags = line.slice(0, -1).split(' contain ')
    let bagName = bags[0]
    let bagInBags = bags[1].split(', ')
    if (!bagInBags[0].includes('no other bags')) {
      list[bagName] = bagInBags
    }
  }

  // remove "currentBag" children
  for (let input of list[currentBag]) {
    let test = /^\d (.*) (.*) (.*)/.exec(input)
    delete list[test[1] + ' ' + test[2] + ' bags']
  }

  // remove "currentbag"
  delete list[currentBag]
  return list
}

const deleteLastWord = (str) => {
  let lastIndex = str.lastIndexOf(' ')
  return str.substring(0, lastIndex)
}

const parseBagParentAndChildren = (line) => {
  let bags = line.slice(0, -1).split(' contain ')
  let bagParent = deleteLastWord(bags[0])
  let bagChildren = []
  for (let child of bags[1].split(', ')) {
    bagChildren.push(deleteLastWord(child))
  }
  return { bagParent, bagChildren }
}

const createBag = (bagParent, bagChildren) => {
  let objBag = {}
  objBag[bagParent] = []
  for (let child of bagChildren) {
    if (child == 'no other') {
      objBag[bagParent]['no other'] = 0
    } else {
      let firstIndex = child.indexOf(' ')
      let number = parseInt(child.substring(0, firstIndex))
      let childName = child.substring(firstIndex + 1, child.length)
      objBag[bagParent][childName] = number
    }
  }
  return objBag
}

const findElement = (data, needle) => {
  return data.filter( (key) => {
    return Object.keys(key)[0] == needle
  })[0][needle] // e.g. return [ 'dark olive': 1, 'vibrant plum': 2 ]
}

const runTree = (allBags, currentBag) => {
  if (currentBag == 'no other') {
    return 0
  } else {
    let operation = 0
    for (const [index, value] of Object.entries(findElement(allBags, currentBag))) {
      operation += value + value * runTree(allBags, index)
    }
    return operation
  }
}

exports.run = run

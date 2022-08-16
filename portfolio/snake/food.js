import { randomGridPosition } from './grid.js'
import { onSnake, growSnake } from './snake.js'
// let food = { x: 22, y: 5, value: 1 }
let food = { ...getRandomFoodPosition(), value: 2 }

export function update() {
  console.log('das')
  if (onSnake(food)) {
    growSnake(food.value)
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodCoords
  while (newFoodCoords == null || onSnake(newFoodCoords)) {
    newFoodCoords = randomGridPosition()
  }

  return newFoodCoords
}


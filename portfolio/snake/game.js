import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, onSnake, snakeHead, snakeIntersection } from './snake.js'
import { draw as drawFood, update as updateFood } from './food.js'
import { outSideGrid } from './grid.js'
let lastRenderTime = 0
let gameOver = false

const gameBoard = document.querySelector('#game-board')

//initial game start
document.querySelector('#start-snake').addEventListener('click', () => {
  window.requestAnimationFrame(main)
  window.addEventListener(
    "keydown",
    (e) => {
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }
    },
    false
  );
})



function main(currentTime) {
  if (gameOver) {
    alert('game over')
    return
  }
  window.requestAnimationFrame(main) // game loop refresh when window allows next animation frame to be render
  const secondsLastRender = (currentTime - lastRenderTime) / 1000

  if (secondsLastRender < 1 / SNAKE_SPEED) return //fps -> faster snake = often page resresh
  lastRenderTime = currentTime // update time

  draw()
  update()
}

function update() {
  updateSnake()
  checkLose()
  updateFood()
}

function draw() {
  gameBoard.innerHTML = '' //clear between draws
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkLose() {
  gameOver = outSideGrid(snakeHead()) || snakeIntersection()
}

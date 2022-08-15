export const GRID_WIDTH = 52
export const GRID_HEIGHT = 7
export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_WIDTH) + 1,
    y: Math.floor(Math.random() * GRID_HEIGHT) + 1
  }
}

export function outSideGrid(coords) {
  return (
    coords.x < 1 || coords.x > GRID_WIDTH || coords.y < 1 || coords.y > GRID_HEIGHT
  )

}
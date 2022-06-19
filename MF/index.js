const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

window.addEventListener('resize', scaleMap)

const map = new Image()
map.src = './assets/map/mapa.png'
map.onload = () => {
  scaleMap()
}

function scaleMap() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.drawImage(map, -600, -550)
}
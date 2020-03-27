import Phaser from 'phaser'

export function initGame() {
  const game = new Phaser.Game(
    16 * 32,
    600,
    Phaser.AUTO,
    document.getElementById('game')
  )
  const Game = {}
  game.state.add('Game', Game)
  game.state.start('Game')
  console.log('game started')
}

import InfoSongComponent from './components/infoSongComponent.js'
import PlayerComponent from './components/playerCompnent.js';
import SongsListComponent from './components/songsListComponent.js'

document.addEventListener('DOMContentLoaded', async function () {
  const songsListComponent = new SongsListComponent()
  const infoSongComponent = new InfoSongComponent();
  const playerComponent = new PlayerComponent();
  
  songsListComponent.initialize()
  infoSongComponent.initialize()
  playerComponent.initialize()
})

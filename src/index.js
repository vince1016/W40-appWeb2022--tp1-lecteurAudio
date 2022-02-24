import InfoSongComponent from './components/infoSongComponent.js'
import SongsListComponent from './components/songsListComponent.js'

document.addEventListener('DOMContentLoaded', async function () {
  const songsListComponent = new SongsListComponent()
  const infoSongComponent = new InfoSongComponent();
  
  songsListComponent.initialize()
  infoSongComponent.initialize()
})

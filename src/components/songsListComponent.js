import axios from 'axios'
import toastr from 'toastr'

export default class SongsComponent {
  constructor () {
    this.songsListEl = document.getElementById('songsList')

    // Élément contenant une image de chargement (voir index.html)
    // Cette image est utilisé dans renderDOM seulement.
    this.loadingEl = document.getElementById('loading-component-songsList')

    this.songs = []
  }

  async initialize () {
    await this.fetchSongs()
    this.renderDOM()
  }

  renderDOM () {
    this.loadingEl.style.visibility = 'visible' // <-- Affiche l'indicateur de chargement.
    this.songs.forEach(song => {
      const listItemEl = document.createElement('li')
      listItemEl.innerHTML = "<a href='#' >" + song.songName + '</a>'
      listItemEl.setAttribute('data-song-id', song.id)
      this.songsListEl.appendChild(listItemEl)
    })
    this.loadingEl.style.visibility = 'hidden' // <-- Cache l'indicateur de chargement.
  }

  async fetchSongs () {
    try {
      const { data } = await axios.get('http://localhost:3000/songs')
      this.songs = data
    } catch (error) {
      this.displayErrorMessage()
      console.log("*** Erreur dans l'exemple 1:" + error)
    }
  }

  displayErrorMessage () {
    toastr.options = {
      closeButton: true,
      timeOut: '0'
    }
    toastr.error(
      "Une erreur est survenue sur cette page. Si l'erreur persiste, communiquez avec le service à la clientèle."
    )
  }
}

import axios from "../../node_modules/axios/index"
import toastr from 'toastr'

export default class SongsListComponent{
    constructor () {
        this.songsListEL = document.getElementById('songsList')
        this.songsButtonEL 
        this.loadingEL = document.getElementById('loading-component-songs')
        this.songs = []
        this.selected
    }

    select(id){
        this.selected = this.songs[id-1]
        document.body.dispatchEvent(
            new CustomEvent('selectSongEvent', {
            detail: {
                artistId: this.selected.artistId,
                songId: this.selected.id
            }
          })
        )
    }

    async initialize(){
        await this.fetchSongs()
        this.renderDOM()
    }

    async fetchSongs(){
        try{
            const { data } = await axios.get('http://localhost:3000/songs')
            this.songs = data
        } catch(error){ 
            this.displayError()
            console.log("*&error in song list comp" + error)
        }
    }

    renderDOM(){
        this.loadingEL.style.visibility = 'visible'
        this.songs.forEach(song => {
            const songLIAdd = document.createElement('li')
            const songAAdd = document.createElement('button')
            songAAdd.innerHTML = song.fileName
            songAAdd.setAttribute('data-song-id', song.id)
            songAAdd.addEventListener('click', event => this.select(parseInt(song.id)))
            songLIAdd.appendChild(songAAdd)
            this.songsListEL.appendChild(songLIAdd)
        })
        this.loadingEL.style.visibility = 'hidden'
    }

    displayError(){
        toastr.options = {
            closeButton: true,
            timeOut: '0'
        }
        toastr.error(
            "une erreur empeche le bon fonctionement de la page (songListComp), voir avec l'administrateur."
        )
    }
}
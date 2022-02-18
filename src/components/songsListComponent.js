import axios from "../../node_modules/axios/index"
import toastr from 'toastr'

export default class SongsListComponent{
    constructor () {
        this.songsListEL = document.getElementById('songsList')
        this.songs = []
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
        this.songs.forEach(song => {
            const songLIAdd = document.createElement('li')
            songLIAdd.innerHTML = song.fileName
            songLIAdd.setAttribute('data-song-id', song.id)
            this.songsListEL.appendChild(songLIAdd)
        })
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
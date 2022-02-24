import axios from "../../node_modules/axios/index"
import toastr from 'toastr'

export default class InfoSongComponent{
    constructor(){
        this.descriptionEL = document.getElementById('songDesc')
        this.artistDescriptEL = document.getElementById('artistDesc')
        this.artist = Object
        this.song = Object
        this.artists = []
    }

    async initialize(){
        document.body.addEventListener('selectSongEvent', event =>
        this.select(event.detail.artistId, event.detail.songId)
        )
        await this.fetchArtist()
    }

    async select(idArt, idSong){
        for (let i = 0; i < this.artists.length; i++) {
            if (parseInt(this.artists[i].id) == parseInt(idArt)) {
                this.artist = this.artists[i];
                await this.selectSong(idSong)
            }
        }
        this.renderDOM()
        this.loadSongInPlayerTrigger()
    }

    loadSongInPlayerTrigger(){
        document.body.dispatchEvent(
            new CustomEvent('loadSongEvent', {
            detail: {
                artistId: this.artist.id,
                songId: this.song.id
            }
          })
        )
    }

    async selectSong(idSong){
        try{
            const { data } = await axios.get('http://localhost:3000/songs/' + idSong)
            this.song = data
        } catch(error){
            this.displayError()
            console.log("*&error in song info comp -- song setting" + error)
        }
    }

    async fetchArtist(){
        try{
            const { data } = await axios.get('http://localhost:3000/artists')
            this.artists = data
        } catch(error){
            this.displayError()
            console.log("*&error in song info comp -- artist setting" + error)
        }
    }

    renderDOM(){
        this.descriptionEL.textContent = this.song.desc
        this.artistDescriptEL.textContent = this.artist.desc
    }

    displayError(){
        toastr.options = {
            closeButton: true,
            timeOut: '0'
        }
        toastr.error(
            "une erreur empeche le bon fonctionement de la page (infoSongComponent), voir avec l'administrateur."
        )
    }
}
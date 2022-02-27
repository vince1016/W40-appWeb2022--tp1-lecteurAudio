import axios from "../../node_modules/axios/index"
import toastr from 'toastr'

export default class PlayerComponent{
    constructor(){
        this.artistNameEL = document.getElementById('artistName')
        this.songNameEL = document.getElementById('songName')
        this.playButtonEL = document.getElementById('btnPlay')
        this.pauseButtonEL = document.getElementById('btnPause')
        this.stopButtonEL = document.getElementById('btnStop')
        this.artist = Object
        this.song = Object
        this.currentTime = 0
        this.totalTime = 0
        this.isPlaying = false
    }

    async initialize(){
        document.body.addEventListener('loadSongEvent', event =>{
            this.artist = event.detail.artist
            this.song = event.detail.song
            await this.setSongToPlay()
        })
        //await..
        this.renderDOM()
    }

    async setSongToPlay(){
        // try{
        //     const { songData } = await axios.get('http://localhost:3000/songs/' + this.songId)
        //     this.song = songData
        //     const { artistData } = await axios.get('http://localhost:3000/artists/' + this.artistId)
        //     this.artist = artistData
        // } catch(error){
        //     this.displayError()
        //     console.log("*&error in player comp" + error)
        // }
    }

    renderDOM(){
       // this.loadingEL.style.visibility = 'visible'
        
        //this.loadingEL.style.visibility = 'hidden'
    }

    displayError(){
        toastr.options = {
            closeButton: true,
            timeOut: '0'
        }
        toastr.error(
            "une erreur empeche le bon fonctionement de la page (player), voir avec l'administrateur."
        )
    }
}
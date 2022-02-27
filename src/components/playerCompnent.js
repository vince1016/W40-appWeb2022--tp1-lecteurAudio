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
            this.renderDOM()
            //set tot time
        })
        this.playButtonEL.addEventListener('click', event=>{
            this.isPlaying = true
            this.manageCurrentTime(this.isPlaying)
        })
        this.pauseButtonEL.addEventListener('click', event=>{
            this.isPlaying = false
            this.manageCurrentTime(this.isPlaying)
        })
        this.stopButtonEL.addEventListener('click', event=>{
            this.isPlaying = false
            this.resetTimer()
        })
    }

    manageCurrentTime(isPlaying){
        
        //this.renderDOM()
    }

    resetTimer(){
        this.currentTime = 0
        this.renderDOM()
    }

    renderDOM(){
       // this.loadingEL.style.visibility = 'visible'
       this.artistNameEL.textContent = this.artist.name 
       this.songNameEL.textContent = this.song.songName 

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
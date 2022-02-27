import axios from "../../node_modules/axios/index"
import toastr from 'toastr'

export default class PlayerComponent{
    constructor(){
        this.artistNameEL = document.getElementById('artistName')
        this.songNameEL = document.getElementById('songName')
        this.playButtonEL = document.getElementById('btnPlay')
        this.pauseButtonEL = document.getElementById('btnPause')
        this.stopButtonEL = document.getElementById('btnStop')
        this.currentTimeEL = document.getElementById('currentTime')
        this.totalTimeEL = document.getElementById('duration')
        this.artist = Object
        this.song = Object
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
        this.playButtonEL.style.visibility = 'visible'
        this.pauseButtonEL.style.visibility = 'hidden'
    }

    manageCurrentTime(isPlaying){
        if(this.song != Object){
            if(isPlaying){
                this.playButtonEL.classList.add('d-none')
                this.playButtonEL.style.visibility = 'hidden'
                this.pauseButtonEL.classList.remove('d-none')
                this.pauseButtonEL.style.visibility = 'visible'
                //start current
            }
            else{
                this.playButtonEL.classList.remove('d-none')
                this.playButtonEL.style.visibility = 'visible'
                this.pauseButtonEL.classList.add('d-none')
                this.pauseButtonEL.style.visibility = 'hidden'
                //pause current
            }
        }
        //this.renderDOM()
    }

    resetTimer(){
        if(this.song != Object){
            //besoin de coriger le style
            this.currentTime = 0
            this.playButtonEL.classList.remove('d-none')
            this.playButtonEL.style.visibility = 'visible'
            this.pauseButtonEL.classList.add('d-none')
            this.pauseButtonEL.style.visibility = 'hidden'
            
            this.renderDOM()
        }
    }

    renderDOM(){
       this.artistNameEL.textContent = this.artist.name 
       this.songNameEL.textContent = this.song.songName
    }

    // displayError(){
    //     toastr.options = {
    //         closeButton: true,
    //         timeOut: '0'
    //     }
    //     toastr.error(
    //         "une erreur empeche le bon fonctionement de la page (player), voir avec l'administrateur."
    //     )
    // }
}
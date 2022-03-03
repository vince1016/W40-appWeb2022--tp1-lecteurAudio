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
        this.songListEL = document.getElementById('songsList')
        this.artist = Object
        this.song = Object
        this.songPlay = Object
        this.isPlaying = false
    }

    async initialize(){
        document.body.addEventListener('loadSongEvent', event =>{
            this.artist = event.detail.artist
            this.song = event.detail.song
            this.songPlay = new Audio('./songs/' + event.detail.songFile)
            this.renderDOM()
        })
        this.playButtonEL.addEventListener('click', event=>{
            this.isPlaying = true
            this.manageCurrentTime(this.isPlaying)
            //event to block section of song when playing
        })
        this.pauseButtonEL.addEventListener('click', event=>{
            this.isPlaying = false
            this.manageCurrentTime(this.isPlaying)
            //event to block section of song when playing
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
                this.songPlay.play()
                this.songListEL.classList.add('d-none')
                this.songListEL.style.visibility = 'hidden'
            }
            else{
                this.playButtonEL.classList.remove('d-none')
                this.playButtonEL.style.visibility = 'visible'
                this.pauseButtonEL.classList.add('d-none')
                this.pauseButtonEL.style.visibility = 'hidden'
                this.songPlay.pause()
                this.songListEL.classList.remove('d-none')
                this.songListEL.style.visibility = 'visible'
            }
        }
        this.renderDOM()
    }

    resetTimer(){
        if(this.song != Object){
            this.songPlay.pause()
            this.songPlay.currentTime = 0
            this.playButtonEL.classList.remove('d-none')
            this.playButtonEL.style.visibility = 'visible'
            this.pauseButtonEL.classList.add('d-none')
            this.pauseButtonEL.style.visibility = 'hidden'
            this.songListEL.classList.remove('d-none')
            this.songListEL.style.visibility = 'visible'
            this.renderDOM()
        }
    }

    updateCurrentTime(){
        setInterval(() => this.currentTimeEL.textContent = this.convert(parseInt(this.songPlay.currentTime))   , 1000);
    }

    renderDOM(){
        if (this.song != Object) {
            this.artistNameEL.textContent = this.artist.name 
            this.songNameEL.textContent = this.song.songName
            if(this.isPlaying){
                this.totalTimeEL.textContent = this.convert(parseInt(this.songPlay.duration))
            }
            this.updateCurrentTime()
        }
    }

    //https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    convert(value) {
        return new Date(value * 1000).toISOString().substr(14, 5)
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
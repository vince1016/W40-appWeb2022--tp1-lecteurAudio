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
        this.songPlay = Object
        this.isPlaying = false
        // require('chorus/names').into(global);
    }

    async initialize(){
        document.body.addEventListener('loadSongEvent', event =>{
            this.artist = event.detail.artist
            this.song = event.detail.song
            this.songPlay = new Audio('./songs/' + event.detail.songFile)
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
                this.songPlay.play()
            }
            else{
                this.playButtonEL.classList.remove('d-none')
                this.playButtonEL.style.visibility = 'visible'
                this.pauseButtonEL.classList.add('d-none')
                this.pauseButtonEL.style.visibility = 'hidden'
                this.songPlay.pause()
            }
        }
        this.renderDOM()
    }

    resetTimer(){
        if(this.song != Object){
            //besoin de coriger le style
            this.songPlay.pause()
            this.currentTime = 0
            this.playButtonEL.classList.remove('d-none')
            this.playButtonEL.style.visibility = 'visible'
            this.pauseButtonEL.classList.add('d-none')
            this.pauseButtonEL.style.visibility = 'hidden'
            this.renderDOM()
        }
    }

    renderDOM(){
        if (this.song != Object) {
            this.artistNameEL.textContent = this.artist.name 
            this.songNameEL.textContent = this.song.songName
            this.currentTimeEL.textContent = this.convertCurrent(parseInt(this.songPlay.currentTime))
            if(this.isPlaying){
                this.totalTimeEL.textContent = this.convertDuration(parseInt(this.songPlay.duration))
            }
        }
    }

    //https://www.codegrepper.com/code-examples/javascript/convert+seconds+to+minutes+javascript
    convertDuration(value) {
        //+que 10 minutes
        if(value >= 60*10){
            return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
        }
        else{
            return '0' + Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
        }
        
    }

    //https://www.codegrepper.com/code-examples/javascript/convert+seconds+to+minutes+javascript
    convertCurrent(value) {
        if(value < 10){
            return '0' + Math.floor(value / 60) + ":" + (value % 60 ? '0' + value % 60 : '00')
        }
        else{
            //+que 10 minutes
            if(value >= 60*10){
                return Math.floor(value / 60) + ":" + (value % 60 ? '0' + value % 60 : '00')
            }
            else{
                return '0' + Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
            }
        }
        
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
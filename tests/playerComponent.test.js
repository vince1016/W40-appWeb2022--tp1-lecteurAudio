import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mockAxios from 'axios'
import mockToastr from 'toastr'
import { artistJsonFake } from './data/artists'
import { songsJsonFake } from './data/songs'

jest.mock('axios')
jest.mock('toastr')

beforeEach(()=>{
    jest.clearAllMocks()
    document.body.innerHTML=`
    <button id="btnPlay"></button>
    <button id="btnPause"></button>
    <button id="btnStop"></button>
    <p class="p-2 bg-dark text-center">
    Temps courant: <span id="currentTime">00:00</span><br />
    Durée: <span id="duration">00:00</span>
    </p>
    `
})
describe('player test', () => {

    
test("À l'ouverture, la liste doit contenir des couleurs", () => {
    // arrange

    // action

    // assert
  })
})
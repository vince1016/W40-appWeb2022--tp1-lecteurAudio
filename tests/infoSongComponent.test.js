import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mockAxios from 'axios'
import mockToastr from 'toastr'
import SongsListComponent from '../src/components/songsListComponent'
import { songsJsonFake } from './data/songs'
import { async } from 'regenerator-runtime'


jest.mock('axios')
jest.mock('toastr')

//const {data: songs} = songsJsonFake

beforeEach(()=>{
    jest.clearAllMocks()
    document.body.innerHTML=`
    <h2>Informations de la chanson</h2>
    <p id="songDesc"></p>
    <p id="artistDesc"></p>
    `
})

test("test name to be", async ()=>{
    //arrenge
    

    //act
    

    //assert
    
})
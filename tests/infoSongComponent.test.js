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
    // jest.clearAllMocks()
    // document.body.innerHTML=`
    //     <ul id="songsList"></ul>
    // `
})

test("test name to be", async ()=>{
    //arrenge
    

    //act
    

    //assert
    
})
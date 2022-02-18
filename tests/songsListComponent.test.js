import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mockAxios from 'axios'
import mockToastr from 'toastr'
import SongsListComponent from '../src/components/songsListComponent'
import { songsJsonFake } from './data/songs'
import { async } from 'regenerator-runtime'

jest.mock('axios')
jest.mock('toastr')


const {data: songs} = songsJsonFake

beforeEach(()=>{
    jest.clearAllMocks()
    document.body.innerHTML=`
        <ul id="songsList"></ul>
    `
})

test("test name to be", async ()=>{
    
    //arrenge
    mockAxios.get.mockResolvedValue({data:songs})

    const songsListComponent = new SongsListComponent()
    const expectedSongs = songs.map(song => song.fileName)

    //act
    await songsListComponent.initialize()

    //assert
    const elemsUL = Array.from(document.getElementsByTagName('li'))
    const returnedSongs = elemsUL.map(songEL => songEL.innerHTML)
    expect(returnedSongs).toEqual(expectedSongs)
})
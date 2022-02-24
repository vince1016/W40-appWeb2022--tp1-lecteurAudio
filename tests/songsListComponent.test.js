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
        <img id="loading-component-songs"/>
    `
})

test("songs are fetch at oppening", async ()=>{
    
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

test("loading is not visible after dom render", async ()=>{
    
    //arrenge
    mockAxios.get.mockResolvedValue({data:songs})
    const songsListComponent = new SongsListComponent()
    const expectedVisibility = 'hidden'


    //act
    await songsListComponent.initialize()

    //assert
    expect(expectedVisibility).toEqual(document.getElementById('loading-component-songs').style.visibility)
})

test("error when songs fetch dont work", async ()=>{
    
    //arrenge
    mockAxios.get.mockRejectedValue({data:songs})
    const songsListComponent = new SongsListComponent();

    //act
    await songsListComponent.initialize()

    //assert
    expect(mockToastr.error).toHaveBeenCalled()
})
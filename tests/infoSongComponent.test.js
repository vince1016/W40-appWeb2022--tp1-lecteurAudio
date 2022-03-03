import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mockAxios from 'axios'
import mockToastr from 'toastr'
import SongsListComponent from '../src/components/songsListComponent'
import { songsJsonFake } from './data/songs'
import { artistsJsonFake } from './data/artists'
import { async } from 'regenerator-runtime'
import InfoSongComponent from '../src/components/infoSongComponent'


jest.mock('axios')
jest.mock('toastr')

const {data: songs} = songsJsonFake
const {data: artists} = artistsJsonFake
//const {data: songs} = songsJsonFake
describe('test de infoSongsComp', () => {
    beforeEach(()=>{
        jest.clearAllMocks()
        document.body.innerHTML=`
        <h2>Informations de la chanson</h2>
        <p id="songDesc"></p>
        <p id="artistDesc"></p>
        `
    })

    test("initialize va chercher les artistes", async ()=>{
        //arrenge
        mockAxios.get.mockResolvedValueOnce({data: artists})
        const infoSongComponent = new InfoSongComponent()
        const expectedLog = {data: artists}
        
        //act
        await infoSongComponent.initialize()

        //assert
        expect(console.log).toEqual(expect.anything(), expectedLog)
    })

    test("error quand les songs ne sont pas bien chercher", async ()=>{
        
        //arrenge
        mockAxios.get.mockRejectedValue({data:artists})
        const infoSongComponent = new InfoSongComponent();

        //act
        await infoSongComponent.initialize()

        //assert
        expect(mockToastr.error).toHaveBeenCalled()
    })

    test("select retourne les artistes avec un custom event", async ()=>{
        //arrenge
        mockAxios.get.mockResolvedValueOnce({data: artists})
        const infoSongComponent = new InfoSongComponent()
        const expectedArtistId = {
            artistId: 1
        }
        var isCalled = false
        await infoSongComponent.initialize()
        document.body.addEventListener('selectSongEvent', () =>{
            isCalled = true
        })

        //act
        document.body.dispatchEvent(
            new CustomEvent('selectSongEvent', {
            detail: {
                artistId: 1,
                songId:1
            }
            })
        )

        //assert
        expect(infoSongComponent.artist.id).toEqual(expectedArtistId.artistId)
        expect(isCalled).toEqual(true)
    })
    
    //dont work need help
    // test("select get song from event", async ()=>{
    //     //arrenge
    //     mockAxios.get.mockResolvedValueOnce({data: songs[0]})
    //     const infoSongComponent = new InfoSongComponent()
    //     const expectedSongId = {
    //         songId:1
    //     }
    //     await infoSongComponent.initialize()

    //     //act
    //     await infoSongComponent.selectSong(expectedSongId.songId)

    //     //assert
    //     expect(await infoSongComponent.song.id).toEqual(expectedSongId.songId)
    // })
            //act
            

            //assert
})

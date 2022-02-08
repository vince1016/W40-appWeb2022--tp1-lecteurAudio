/* eslint-env jest */
// Les deux imports ci-dessous sont nécessaires pour l'utilisation de async/await avec Jest
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import SongsListComponent from '../src/components/songsListComponent.js'
import mockAxios from 'axios'
import mockToastr from 'toastr'
import { songsJsonFake } from './data/songs.js' // Ce sont les données utilisées par le test.

// Création des mocks avec l'instruction "jest.mock"
jest.mock('axios')
jest.mock('toastr')

const { data: songs } = songsJsonFake

beforeEach(() => {
  jest.clearAllMocks()
  document.body.innerHTML = `
    <ul id="songsList"></ul>
    <img id="loading-component-songsList"></img>
    `
})

test("À l'ouverture, la liste doit contenir les noms des chansons", async () => {
  // arrange
  // Étant donné que notre code à tester doit utiliser get de axios, il faut indiquer ce qu'on veut comme valeur retourner par la promessse.
  mockAxios.get.mockResolvedValue({ data: songs })
  const songsList = new SongsListComponent()
  const expectedSongs = songs.map(
    song => '<a href="#">' + song.songName + '</a>'
  )

  // action
  await songsList.initialize()

  // assert
  const liEls = Array.from(document.getElementsByTagName('li'))
  const resultSongs = liEls.map(songEl => songEl.innerHTML)
  expect(resultSongs).toEqual(expectedSongs)
})
test("Un message doit informer l'utilisateur si une erreur avec le serveur s'est produite.'", async () => {
  // arrange           _____ Le promesse sera "rejected" lorsque le get de axios sera appelé.
  //                  v
  mockAxios.get.mockRejectedValue(new Error('async error'))
  // mockAxios.get.mockImplementation(() => Promise.reject(new Error('Async error')))

  const songsList = new SongsListComponent()

  // action
  await songsList.initialize()

  // assert
  expect(mockToastr.error).toHaveBeenCalled()
})

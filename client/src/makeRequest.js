import axios from 'axios'

export const makeRequest = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    Authorization:
      'bearer ' +
      'c7ab047bfcaeafdfd3b6b6c6d5d44b86d3523eb1d1496622b016150085ff6db0273e5df1a4ca2d1c8a798b6b9b896508e0e76c9cff026291b52eab1800b7e5b990c0e8ac8c1de6571656ab67bcd07af80c9dc0469d55318bcc8b4bc55169a33cad3e740d98d1deec3c6b737611339c4ec02d5a12380db5cc247353213e2ff830'
  }
})

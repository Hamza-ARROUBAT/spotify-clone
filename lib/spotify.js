import SpotifyWebApi from 'spotify-web-api-node/src/spotify-web-api'
const queryString = require('query-string')

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  // 'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read'
].join(' ')

const params = {
  scopes: scopes
}

const queryParamString = new URLSearchParams(params)

const LOGIN_URL =
  'https://accounts.spotify.com/authorize?' + queryParamString.toString()

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

export const LOGIN_URI =
  'https://accounts.spotify.com/authorize?' +
  queryString.stringify({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    scope: scopes,
    redirect_uri: 'http://localhost:3000/api/auth/callback/spotify',
    state: '0156151651651651'
  })

export { LOGIN_URL }

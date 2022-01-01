import React, { useState } from 'react'
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

export default function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  console.log(playlistId)

  return (
    <div className="h-screen p-5 overflow-y-scroll text-sm text-gray-500 border-r border-gray-900 scrollbar-hide">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <HomeIcon className="w-6 h-5" />
          <p>LogOut</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-6 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-6 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-6 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-{0.1px} border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-6 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-6 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-6 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-{0.1px} border-gray-900" />

        {playlists.map((playlist) => (
          <p
            className="cursor-pointer hover:text-white"
            onClick={() => {
              setPlaylistId(playlist.id)
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

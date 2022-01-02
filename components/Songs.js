import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'

export default function Songs() {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-28">
      {playlist?.tracks.items.map((track, i) => (
        <div key={track.track.id}>
          <Song track={track} order={i} />
        </div>
      ))}
    </div>
  )
}

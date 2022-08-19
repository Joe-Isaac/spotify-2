import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song';
import useSpotify from '../hooks/useSpotify';
import {millisToMinutesAndSeconds} from "../lib/time"
import {isPlayingState, currentTrackIdState} from "../atoms/songAtom";

function Songs() {
    const spotifyApi = useSpotify();
    const playlist = useRecoilValue(playlistState)
    const [currentTrackId, setCurrentTrackId] = 
    useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = (song) => {
        setCurrentTrackId();
        setIsPlaying(true);
        console.log(song.track.uri)
        spotifyApi.play({
            uris: [song.track.uri],
        })
    }

    console.log(playlist?.tracks?.items)
  return (
    <div className='text-white px-8 flex flex-col 
    space-y-1 pb-20 pl-10 '>
        {playlist?.tracks?.items.map((song, i) => (
            
            <div key={song.track.id} className='grid grid-cols-2 text-gray-500
             py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'
             onClick={()=>{
                console.log("You have clicked a song");
                playSong(song)
            }}
             > 
                <div className='flex items-center space-x-4'
                >
                <p>{i + 1}</p>
                <img className='h-10 w-10' src={song.track.album.images[0].url} alt=""/>
                    <div>
                        <p className='
                        w-36 lg:w-64 text-white truncate
                        '>{song.track.name}</p>
                        <p className='
                        w-40
                        '>{song.track.artists[0].name}</p>
                    </div>
                </div>

                <div className="flex items-center
                justify-between ml-auto md:ml-0">
                    <p className='hidden md:inline w:40'>{song.track.album.name}</p>
    
                    <p>{millisToMinutesAndSeconds(song.track.duration_ms)}</p>
                </div>
                </div>

        ))}
    </div>
  )
}

export default Songs
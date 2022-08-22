import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify';
import {isPlayingState, currentTrackIdState} from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import {useRecoilState} from "recoil"

function Player() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentIdTrack] = 
    useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    
    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(
                data => {
                    console.log("Now playing: ", data.body?.item)
                    setCurrentIdTrack(data.body?.item?.id);

                    spotifyApi.getMyCurrentPlaybackState().then(data => {

                        setIsPlaying(data.body?.is_playing);
                    })
                }
            )
        }
    }

    const songInfo = useSongInfo();

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId){
            //fetch song info
            fetchCurrentSong();
            setVolume(50);
        }
      
      
    }, [currentTrackId, spotifyApi, session])
    
  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-500 text-white'>
       <div>
        <img className='hidden md:inline h-10 w-10'
         src={songInfo?.album?.images?.[0]?.url} alt=""/>
         <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
         </div>
       </div>
    </div>
  )
}

export default Player
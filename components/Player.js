import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import useSpotify from '../hooks/useSpotify';
import {isPlayingState, currentTrackIdState} from "../atoms/songAtom";
import {useSongInfo} from "../hooks/useSongInfo";
import {useRecoilState} from "recoil"

function Player() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentTrackId] = 
    useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    //const songInfo = useSongInfo();
  return (
    <div>
       <div>
        
       </div>
    </div>
  )
}

export default Player
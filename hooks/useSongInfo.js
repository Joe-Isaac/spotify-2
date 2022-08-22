import {useState, useEffect} from 'react'
import useSpotify from './useSpotify';
import {currentTrackIdState} from "../atoms/songAtom";
import {useRecoilState} from "recoil";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = 
    useRecoilState(currentTrackIdState);

    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
      const fetchSongInfo = async () => {
        if(currentIdTrack){
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                {
                    headers: {
                        Authorization: `bearer ${spotifyApi.getAccessToken()}`,

                    }
                }).then(res => res.json());

                setSongInfo(trackInfo);
        }
      };
    
      fetchSongInfo();
    }, [currentIdTrack, spotifyApi]);
    

  return songInfo;
}

export default useSongInfo
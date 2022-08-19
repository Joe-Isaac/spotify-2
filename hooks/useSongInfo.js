import React from 'react'
import useSpotify from '../hooks/useSpotify';
import {isPlayingState, currentTrackIdState} from "../atoms/songAtom";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = 
    useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
      const fetchSongInfo = async () => {
        if(currentTrackId){
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                {
                    headers: {
                        Authorization: `bearer ${spotifyApi.getAccessToken()}`,

                    }
                }).then(res => res.json());

                setSongInfo(trackInfo);
        }
      }
    
      return songInfo
    }, [currentIdTrack, spotifyApi()])
    

  return songInfo
}

export default useSongInfo
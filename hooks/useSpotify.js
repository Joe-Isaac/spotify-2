import { signIn, useSession } from 'next-auth/react'
import {useEffect} from "react";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

function useSpotify() {
const {data: session, status } = useSession();
useEffect(() => {
  if(session){
    if(session.error === 'RefreshAccessTokenError'){
        signIn();
    }

    console.log("Checking access token", session.user.accessToken);
    spotifyApi.setAccessToken(session.user.accessToken);
    console.log("We have set the access token", spotifyApi.getAccessToken());
    
  }


}, [session]);

return spotifyApi;


  
}

export default useSpotify;
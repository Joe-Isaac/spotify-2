import React, { useState, useEffect } from 'react';
import {signOut, useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify"
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    RssIcon,
    PlusCircleIcon,
    HeartIcon,
    LogoutIcon,
} from "@heroicons/react/outline"
import { useRecoilState } from 'recoil';
import {playlistIdState} from '../atoms/playlistAtom'




function Sidebar() {
    const { data: session, status} = useSession();
    const [playLists, setPlayLists] = useState([]);
    const spotifyApi = useSpotify();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
 
    useEffect(() => {
      if(spotifyApi.getAccessToken()){
        
        spotifyApi.getUserPlaylists()
        .then((data) => {
            setPlayLists(data.body.items);
        })
        .catch((err) =>
        {
            console.log("An error occured", err.message)
        })
      }
      else{
        console.log("We dont have an access token yet")

    }}, [session, spotifyApi])
    

    
    


  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm 
     border-r border-gray-900 overflow-y-scroll
      scrollbar-hide h-screen sm:max-w-[12rem] 
      lg:max-w-[15rem] hidden md:inline-flex'>

        <div className='space-y-4 h-screen '>

        <button className='flex items-center space-x-2 hover:text-white '>
        <HomeIcon className='h-5 w-5'/>
        <p>Home</p>
        </button>

        <button className='flex items-center  space-x-2 hover:text-white'>
        <SearchIcon className='h-5 w-5'/>
        <p>Search</p>
        </button>

        <button className='flex items-center  space-x-2 hover:text-white'>
        <LibraryIcon className='h-5 w-5'/>
        <p>Your Library</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900'/>


        <button className='flex items-center space-x-2 hover:text-white '>
        <PlusCircleIcon className='h-5 w-5'/>
        <p>Create playlist</p>
        </button>

        <button className='flex items-center  space-x-2 hover:text-white'>
        <HeartIcon className='h-5 w-5'/>
        <p>Liked Songs</p>
        </button>

        <button className='flex items-center  space-x-2 hover:text-white'>
        <RssIcon className='h-5 w-5'/>
        <p>Your episode</p>
        </button>


        <hr className='border-t-[0.1px] border-gray-900'/>


        {/** Play List comes here */}
        {playLists.map((playlist) => (
            <p className='flex items-center  space-x-2
             hover:text-white cursor-pointer'
             onClick={()=>{setPlaylistId(playlist.id)}}
             key={playlist.id}>
                {playlist.name}
            </p>
        ))}

        </div>
    </div>
  )
}

export default Sidebar
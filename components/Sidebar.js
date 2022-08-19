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




function Sidebar() {
    const { data: session, status} = useSession();
    const [playLists, setPlayLists] = useState([]);
    const spotifyApi = useSpotify();
    const [userId, setUserId] = useState()

    useEffect(() => {
      if(spotifyApi.getAccessToken()){
        console.log("Access token is here", spotifyApi.getAccessToken());

        spotifyApi.getMe().then((user) => {
            console.log(user, "IS THE USER");

            

        spotifyApi.getUserPlaylists(user.body.id)
        .then((data) => {
            console.log("User ID ",user.body.id)
            setPlayLists(data.body.items);
        })
        .catch((err) =>
        {
            console.log("An error occured", err.message)
        })
            // dispatch({
            //   type: "SET_USER",
            //   user: user,
            // });
          });
      }
      else{
        console.log("We dont have an access token yet")

    }}, [session, spotifyApi])
    

    console.log(session, "session");
    console.log(playLists, "Play list");


  return (
    <div className='text-gray-500 p-5 text-sm border-r
     border-gray-900 overflow-y-scroll scrollbar-hide h-screen'>
        <div className='space-y-4 h-screen '>

        <button className='flex items-center space-x-2 hover:text-white '
        onClick={()=> {
            console.log("Youre now being redirected");
            signOut();
            signOut({ callbackUrl: '/Login'})
            // return NextResponse.redirect("http://localhost:3000/Login/");
        }}>
        <LogoutIcon className='h-5 w-5'/>
        <p>LogOut</p>
        </button>

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
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>
        <p className='cursor-pointer hover:text-white'>
            Playlist name...
        </p>

        </div>
    </div>
  )
}

export default Sidebar
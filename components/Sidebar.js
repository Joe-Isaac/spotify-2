import React from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    RssIcon,
    PlusCircleIcon,
    HeartIcon,
    LogoutIcon,
} from "@heroicons/react/outline"

import {signOut, useSession} from "next-auth/react"

function Sidebar() {
    const { data: session, status} = useSession();

    console.log(session);
  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
        <div className='space-y-4'>

        <button className='flex items-center space-x-2 hover:text-white ' onClick={()=> signOut()}>
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
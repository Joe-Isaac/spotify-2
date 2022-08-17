import type { NextPage } from 'next'
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">

      
      <main className='flex'>
        {/** Spotify side bar */}
        <Sidebar />
        <Center/>
      </main>
    </div>
  )
}

export default Home

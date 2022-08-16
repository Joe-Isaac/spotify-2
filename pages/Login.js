import React from 'react'
import {getProviders, signIn} from 'next-auth/react'
//This is where we implement next auth

//Basically this is how next auth will be implemented

//With spotify, once a user is logged in, they get something called an access token

//an access token has various levels of rights

//This allows us to perform various actions on the page

//An access token does not last forever, but expires every hour

//However, with a refresh token, we can acquire a new access token after expiry

//This allows us to implement persistence in our app

function Login({ providers }) {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
        <img className='w-52 mb-5' src="https://Links.papareact.com/9xl" alt=""/>

        {
            Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button className='bg-[#18D860] text-white p-5 rounded-lg'
                    onClick={() => signIn(provider.id, { callbackUrl: '/'})}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))
        }
    </div>
  )
}

export default Login;

export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}
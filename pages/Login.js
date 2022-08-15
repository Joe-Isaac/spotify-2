import React from 'react'

//This is where we implement next auth

//Basically this is how next auth will be implemented

//With spotify, once a user is logged in, they get something called an access token

//an access token has various levels of rights

//This allows us to perform various actions on the page

//An access token does not last forever, but expires every hour

//However, with a refresh token, we can acquire a new access token after expiry

//This allows us to implement persistence in our app

function Login() {
  return (
    <div>Login page</div>
  )
}

export default Login;
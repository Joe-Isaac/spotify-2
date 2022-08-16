import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import SpotifyApi, { LOGIN_URL } from "../../../lib/spotify"


async function refreshAccessToken(token){
    try {
        SpotifyApi.setAccessToken(token.accessToken);
        SpotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await SpotifyApi.refreshAccessToken();

        console.log("REFRESHED TOKEN IS", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from api
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
            // Replace if new one comes back else fall back to old refresh token
        }
    }
    catch(error){
        console.log(error)
        return{
            ...token,
            error: "RefreshAcessTokenError",
        };
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/Login'
  },
  callbacks: {
    async jwt({ token, account, user }){
        //initial sign in
        if(account && user){
            return{
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000, //were handling expiry times in milliseconds
            }
        }

        //refresh token: if it hasnt passed an hour since your last login

        //return the previous token if the access token hasnt expired
        if(Date.now() < token.accessTokenExpires){
            console.log('Access token is still valid')
            return token;
        }

        
        // Access token has expired, we need to refresh it
        console.log('Access token has expired, refreshing...');
        return await refreshAccessToken(token);

    },

    async session({ session, token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;


        return session;
    }
  }


})
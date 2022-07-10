import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAcessToken(token) {
  try {

    spotifyAPI.setAccessToken(token.access_token);
    spotifyAPI.setRefreshToken(token.refresh_token);

  } catch (error) {
    console.error(error);
    return{
        ...token,
        error: "RefreshAcessTokenError",

    }
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
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          acessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          acessTokenExpires: account.expires_at * 1000,
        };
      }
      if ((Date.now(), token.acessTokenExpires)) {
        console.log("Existing acces token is valid");
        return token;
      }
      console.log("Acess token has expired, refreshing...");
      return await refreshAcessToken(token);
    },
  },
});

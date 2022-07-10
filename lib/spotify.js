import SpotifyWebApi from "spotify-web-api-node";

const scopes=[
    "user-read-email",
    "playlist-read-provider",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-playing",
    "user-follow-read",
    "user-library-read",
    "user-read-email"
].join(',');

const params = {
    scope: scopes,

};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.ToString()}`;

const spotifyAPI = new SpotifyWebAPI({
    clientId: process.env.Next_PUBLIC_CLIENT_ID,
    clientSecret: process.env.Next_PUBLIC_CLIENT_SECRET,
});

export default spotifyAPI;
export {LOGIN_URL};
const clientId = process.env.REACT_APP_CLIENT_ID;

const redirectUrl = process.env.REACT_APP_REDIRECT_URI;
const scopes = "user-library-read user-read-private";

export const redirectToSpotifyAuth = () => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  window.location.href = authUrl;
};

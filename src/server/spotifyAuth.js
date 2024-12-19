const clientId = "00e7dcc0cb3e487580d6f1bb18a480c8";
const redirectUrl = "http://localhost:3000/callback";
const scopes = "user-library-read user-read-private";

export const redirectToSpotifyAuth = () => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  window.location.href = authUrl;
};

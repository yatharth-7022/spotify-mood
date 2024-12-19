import { redirectToSpotifyAuth } from "./spotifyAuth";
function LoginButton() {
  return (
    <button
      onClick={redirectToSpotifyAuth}
      className="h-10 w-10 bg-red-400 hover:cursor-pointer"
    >
      Login button
    </button>
  );
}

export default LoginButton;

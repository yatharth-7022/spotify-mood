// Callback.js
import React, { useEffect } from "react";
import MainContent from "../Main/MainContent";
// import AppLayout from "../applayout/AppLayout";

const clientId = "00e7dcc0cb3e487580d6f1bb18a480c8";
const clientSecret = "fa892f25cf2d4b5f94fc36529016aa5d";
// const redirectUri = "https://0c7b-182-69-179-3.ngrok-free.app/callback";
const redirectUri = "http://localhost:3000/callback";
const Callback = () => {
  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");

      if (authorizationCode) {
        // Step 2: Exchange the authorization code for an access token
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const body = new URLSearchParams({
          code: authorizationCode,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        });

        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        };

        try {
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: headers,
            body: body,
          });

          if (!response.ok) {
            throw new Error("Failed to fetch access token");
          }

          const data = await response.json();
          const accessToken = data.access_token;
          const refreshToken = data.refresh_token;

          // Store the access token and refresh token in localStorage
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);

          console.log("Access Token stored in localStorage:", accessToken);
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      } else {
        console.error("Authorization code not found in URL.");
      }
    };

    getAccessToken();
  }, []);

  return (
    <div>
      {/* <AppLayout /> */}
      <MainContent />
    </div>
  );
};

export default Callback;

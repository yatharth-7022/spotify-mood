import React, { useEffect, useState } from "react";
import MainContent from "../Main/Applayout/MainContent";
import { useNavContext } from "../state managament/NavContext";

const Callback = () => {
  const [loading, setLoading] = useState(true);
  const { fetchWithValidToken, fetchUserData, userData } = useNavContext();

  // Function to refresh the access token
  // const refreshAccessToken = async () => {
  //   const refreshToken = localStorage.getItem("refresh_token");
  //   const tokenUrl = "https://accounts.spotify.com/api/token";

  //   const body = new URLSearchParams({
  //     grant_type: "refresh_token",
  //     refresh_token: refreshToken,
  //   });

  //   const headers = {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization: `Basic ${btoa(
  //       `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
  //     )}`,
  //   };

  //   try {
  //     const response = await fetch(tokenUrl, {
  //       method: "POST",
  //       headers: headers,
  //       body: body,
  //     });

  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       console.error("Error refreshing access token:", errorDetails);
  //       throw new Error("Failed to refresh access token");
  //     }

  //     const data = await response.json();
  //     console.log("Refreshed Access Token:", data.access_token);

  //     // Update the  token and expiration time
  //     const expiresIn = 3600 * 1000; // 1 hour in milliseconds
  //     const expirationTime = Date.now() + expiresIn;

  //     localStorage.setItem("access_token", data.access_token);
  //     localStorage.setItem("token_expiration", expirationTime);

  //     return data.access_token;
  //   } catch (error) {
  //     console.error("Error in refreshAccessToken:", error);
  //     throw error;
  //   }
  // };

  // Function to check if the token is expired
  // const isTokenExpired = () => {
  //   const tokenExpiration = localStorage.getItem("token_expiration");
  //   const currentTime = Date.now();

  //   return !tokenExpiration || currentTime >= tokenExpiration;
  // };

  // Function to fetch user data
  // const fetchUserData = async (accessToken) => {
  //   const userUrl = "https://api.spotify.com/v1/me";

  //   try {
  //     console.log("Fetching user data with access token:", accessToken);
  //     const response = await fetch(userUrl, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       console.error("Error fetching user data:", errorDetails);
  //       throw new Error("Failed to fetch user data");
  //     }

  //     const data = await response.json();
  //     console.log("User Data:", data);
  //     setUserData(data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // // Function to handle API calls with token validation
  // const fetchWithValidToken = async (apiCall) => {
  //   let accessToken = localStorage.getItem("access_token");

  //   if (isTokenExpired()) {
  //     console.log("Token expired, refreshing...");
  //     accessToken = await refreshAccessToken();
  //   }

  //   return apiCall(accessToken);
  // };

  // Main function to get access token and fetch user data
  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");

      if (!authorizationCode) {
        console.error("Authorization code not found in URL.");
        window.location.href = "/login";
        return;
      }

      const tokenUrl = "https://accounts.spotify.com/api/token";
      const body = new URLSearchParams({
        code: authorizationCode,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        grant_type: "authorization_code",
      });

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
        )}`,
      };

      try {
        const response = await fetch(tokenUrl, {
          method: "POST",
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("Error fetching access token:", errorDetails);
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        console.log("Access Token Response Data:", data);

        const expiresIn = 3600 * 1000; // 1 hour in milliseconds
        const expirationTime = Date.now() + expiresIn;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("token_expiration", expirationTime);

        await fetchWithValidToken(fetchUserData);
      } catch (error) {
        console.error("Error in getAccessToken:", error);
      } finally {
        setLoading(false);
      }
    };

    getAccessToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <MainContent userData={userData} />;
};

export default Callback;

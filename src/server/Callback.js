import React, { useEffect, useState } from "react";
import MainContent from "../Main/Applayout/MainContent";

const Callback = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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
        Authorization:
          "Basic " +
          btoa(
            `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
          ),
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
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log("Access Token stored in localStorage:", data.access_token);
        await fetchUserData(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserData = async (accessToken) => {
      const userUrl = "https://api.spotify.com/v1/me";
      try {
        const response = await fetch(userUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data, "this is user data");
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAccessToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <MainContent />;
};

export default Callback;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useNavContext } from "../state managament/NavContext";

const Callback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithValidToken, fetchUserData } = useNavContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");

      if (!authorizationCode) {
        console.error("Authorization code not found in URL.");
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-private user-read-email`;
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

        const expiresIn = 3600 * 1000;
        const expirationTime = Date.now() + expiresIn;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("token_expiration", expirationTime);

        await fetchWithValidToken(fetchUserData);

        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Error in getAccessToken:", error);
        setError("Failed to authenticate. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    if (authorizationCode) {
      getAccessToken();
    } else {
      setLoading(false);
    }
  }, [fetchWithValidToken, fetchUserData, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default Callback;

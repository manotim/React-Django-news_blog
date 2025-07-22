import axios from "axios";

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
      refresh,
    });

    const { access } = response.data;

    localStorage.setItem("token", access);
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    return null;
  }
};

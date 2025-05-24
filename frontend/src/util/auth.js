import { redirect } from "react-router";

export const getTokenDuration = () => {
    const storedExpirationTokenDuration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationTokenDuration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
};

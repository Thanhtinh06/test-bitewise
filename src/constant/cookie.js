export const setCookie = (cname, cvalue, exdays) => {
  const expirationDate = new Date();
  expirationDate.setTime(exdays.getTime() + 30 * 60 * 1000); // Set expiration time in days
  const expires = "expires=" + expirationDate.toUTCString();
  const cookieString = cname + "=" + cvalue + ";" + expires + ";path=/";
  document.cookie = cookieString;
};


export const getCookie = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};



export const isCookieExpired = (cookieName, currentTime) => {
  const cookieValue = getCookie(cookieName);

  if (cookieValue !== "") {
    const expirationDate = new Date(cookieValue);
    // console.log('ex',expirationDate)
    // console.log('cur',currentTime)
    // Check if expirationDate is a valid Date object
    if (isNaN(expirationDate.getTime())) {
      console.log("Invalid expirationDate:", cookieValue);
      return true; // Treat as expired if date is invalid
    }
    return expirationDate < currentTime;
  }

  return true; // Cookie doesn't exist or has no value
};

export const getAllCookies = () => {
  const cookies = {};
  const cookieString = document.cookie;

  if (cookieString !== "") {
    const cookieArray = cookieString.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      const separatorIndex = cookie.indexOf("=");
      const cookieName = cookie.substring(0, separatorIndex);
      const cookieValue = cookie.substring(separatorIndex + 1);
      cookies[cookieName] = cookieValue;
    }
  }

  return cookies;
};

export const deleteCookie = (cookieName) => {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};


export const createCookie = (cookieName) => {
  const allCookies = getAllCookies();
  const conditionCreateCookies =
    Object.keys(allCookies).length === 0 ||
    !Object.keys(allCookies).includes(cookieName);
  if (conditionCreateCookies) {
    const timeCurrent = new Date();
    const expirationDate = new Date();
    expirationDate.setTime(timeCurrent.getTime() + 30 * 60 * 1000);
    setCookie(cookieName, expirationDate, timeCurrent);
  }
};
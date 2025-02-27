export {getCookie, setCookie};

/**
 * Gets the value of a cookie.
 * @param name
 */
function getCookie(name: string): string {
  const nameLenPlus = (name.length + 1);
  let cookie = document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`;
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0] || "";

  console.log(cookie);
  return cookie;

}

/**
 * Sets the value of a cookie.
 * @param name
 * @param value
 */
function setCookie(name: string, value: string){
  document.cookie = `${name}=${value}`;
  return;
}

function getTokenFromLocalStorage(){
    return JSON.parse(localStorage.getItem('userData'))?.accessToken;
}
const ACCESS_TOKEN = "access_token";

const LocalStorageService = (() => {
    function _setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    function _getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    function _clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN);
    }

    return {
        setAccessToken : _setAccessToken,
        getAccessToken : _getAccessToken,
        clearAccessToken : _clearAccessToken
    }
}) ();

export default LocalStorageService;
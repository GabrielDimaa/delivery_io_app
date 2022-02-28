function refreshToken(instanceApi) {
    return instanceApi.post("/auth/refresh")
        .then(res => res.data.access_token)
        .catch(err => err);
}

export default refreshToken;
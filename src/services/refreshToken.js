function refreshToken(instanceApi) {
    return instanceApi.post("/auth/refresh")
        .then(res => res.data.access_token)
        .catch(() => null);
}

export default refreshToken;
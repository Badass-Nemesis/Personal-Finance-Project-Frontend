const auth = {
    getToken: function () {
        return localStorage.getItem('x-auth-token');
    },
    setToken: function (token) {
        localStorage.setItem('x-auth-token', token);
    },
    clearToken: function () {
        localStorage.removeItem('x-auth-token');
    }
};

export default auth;
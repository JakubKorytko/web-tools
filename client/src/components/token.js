const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Token = {
    get value() {
        return getCookie("token");
    },
    remove() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    set value(token) {
        document.cookie = `token=${token}`;
    }
}

export default Token
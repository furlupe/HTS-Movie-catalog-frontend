export function post(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

export function get(url) {
    return fetch(url, {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
        })
    })
    .then(response => {
        return response.json()
    });
}

export function put(url, body) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

export function del(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

export function login(username, passwd) {
    post("https://react-midterm.kreosoft.space/api/account/login", {
        "username": username,
        "password": passwd
    })
    .then(response => {
        return response.json();
    })
    .catch(error = console.log(error))
    .then(user => {
        localStorage.setItem("userToken", user.token)
    });
}
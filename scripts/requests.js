function post(url, body = {}) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

function get(url) {
    return fetch(url, {
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
        })
    })
    .then(response => {
        return response.json()
    });
}

function put(url, body) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

function del(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": "Bearer " + localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        })
    })
}

function login(username, passwd) {
    post("https://react-midterm.kreosoft.space/api/account/login", {
        "username": username,
        "password": passwd
    })
    .then(response => {
        return response.json();
    })
    .catch(res => {
        console.log(res)
    })
    .then(user => {
        localStorage.setItem("userToken", user.token)
    });
}

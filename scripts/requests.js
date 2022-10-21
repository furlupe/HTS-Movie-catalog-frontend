function post(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.json())
    .catch(reason => console.log(reason))
    .then(user => {
        return user.token;
    })
}

function get(url, token) {
    return fetch(url, {
        headers: new Headers({
            "Authorization": "Bearer " + token
        })
    })
    .then(response => {
        return response.json()
    });
}
import {login} from "./../requests.js"

export function setLoginButtonEvent() {
    $(".btnlogin").click(() => {
        login(
            $("#loginfield").val(),
            $("#password").val()
        )
    });
}
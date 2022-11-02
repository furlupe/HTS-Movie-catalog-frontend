import { post } from "../requests.js";
import { areFieldsValid } from "./registration_fields.js";

export function registerRegisterButtonEvent () {
    $("#dateofbirth").attr("max", (new Date()).toLocaleDateString('en-CA'));
    $("#dateofbirth").val((new Date()).toLocaleDateString('en-CA'));

    $("#signup-form").submit((e) => {
        e.preventDefault();

        if(!areFieldsValid()) return;
        post("https://react-midterm.kreosoft.space/api/account/register", {
            "userName": $("#loginfield").val(),
            "name": ($("#name").val() ? $("#name").val(): "-"),
            "password": $("#password").val(),
            "email": $("#email").val(),
            "birthDate": (new Date($("#dateofbirth").val())).toISOString(),
            "gender": parseInt($("#sex").val())
        })
        .then(response => {
            response.json().then(data => {
                return {
                    status: response.status,
                    json: data
                };
            })
            .then(r => {
                if (r.status == 200) {
                    localStorage.setItem("userToken", r.json.token);
                    location.replace("/");
                }
    
                for (var error in r.json.errors) {
                    console.log(error)
                    if (error == "DuplicateUserName") {
                        $("#loginfield").addClass("border-danger");
                        $("#loginfield").parent().removeClass("valid");
                        $("#loginfield").parent().addClass("invalid-login-taken");
                    }
                }});
        })
    });
}
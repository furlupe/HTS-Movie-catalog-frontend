import { register } from "./../requests.js";
import { areFieldsValid } from "./registration_fields.js";

export function registerRegisterButtonEvent () {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?w+)*(.\w{2,3})+$/;
    $("#register").click(() => {
        
        if(!areFieldsValid()) return;

        register(
            $("#loginfield").val(),
            $("#name").val(),
            $("#password").val(),
            $("#email").val(),
            (new Date($("#dateofbirth").val())).toISOString(),
            parseInt($("#sex").val())
        );
    });
}
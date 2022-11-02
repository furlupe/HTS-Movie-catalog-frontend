import { put } from "../requests.js";
import { URL_EDIT_USER_PROFILE } from "../requests_consts.js";

export function registerEditButtonEvent() {
    $("#edit").click(() => {
        $(".form-group").each(function() {
            $(this).find("input").removeAttr("disabled");
            $(this).find("select").removeAttr("disabled");
        })
        $("form").removeClass("readonly");
        $("form").addClass("editable");
    })
}

export function registerSaveButtonEvent() {
    $("form").submit((e) => {
        e.preventDefault();
        put(URL_EDIT_USER_PROFILE, {
            id: localStorage.getItem("userId"),
            nickName: $("#profilenickname").text(),
            email: $("#email").val(),
            avatarLink: $("#avatar").val(),
            name: $("#name").val(),
            birthDate: (new Date($("#birthdate").val())).toISOString(),
            gender: parseInt($("#sex").val())
        })
        .then(r => {
            if (r.status == 200) location.reload();
            return r.json();
        })
        .then(json => {
            for (var error in json.errors) {
                $(`#form-${error}`).removeClass("valid");
                $(`#form-${error}`).addClass("invalid");
            }
        })
    });
}
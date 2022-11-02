import { get } from "./../requests.js";
import { initButtons } from "./userprofile_btn_events.js";
import { registerFieldEvents } from "./userprofile_field_events.js";
import { URL_GET_USER_PROFILE } from "../requests_consts.js";

export function showProfile() {
    get(URL_GET_USER_PROFILE)
    .then(profile => {
        $("#avatar-image #pfp").attr("src", profile.avatarLink ?
            profile.avatarLink : "/assets/images/no_avatar.png"
        );
        $("#profilenickname").text(profile.nickName);
        $("#email").val(profile.email);
        $("#avatar").val(profile.avatarLink);
        $("#name").val(profile.name);
        $("#birthdate").val(
            (new Date(profile.birthDate)).toLocaleDateString('en-CA')
        );
        $("#sex").val(profile.gender).change();
        
        initButtons();
        registerFieldEvents();
    });
}
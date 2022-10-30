import { get } from "./../requests.js";

export function showProfile() {
    get("https://react-midterm.kreosoft.space/api/account/profile")
    .then(profile => {
        $("#avatar-image img").attr("src", profile.avatarLink ?
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
    });
}
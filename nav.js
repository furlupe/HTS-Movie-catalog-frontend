$(document).ready(function() {
    $.get("nav.html", function(data) {
        $("#nav-placeholder").replaceWith(data);
        loadNavbar();
    });
})

function loadNavbar() {
    var token = localStorage.getItem("userToken");
    get("https://react-midterm.kreosoft.space/api/account/profile", token)
    .then(json => {
        $(".left-side").find("#favorites").removeClass('d-none');
        $(".left-side").find("#profile").removeClass('d-none');
        
        $(".right-side").find("#login").addClass('d-none');
        $(".right-side").find("#signup").addClass('d-none');

        $(".right-side").find("#authas").removeClass('d-none');
        $(".right-side").find("#nickname").removeClass('d-none').text(json.nickName);
        $(".right-side").find("#signout").removeClass('d-none');
        $(".right-side").find("#signout").click(function() {
            console.log("logging out");
            localStorage.setItem("userToken", "");
        })
    }) 
    .catch(() => {
        $(".right-side").find("#nickname").addClass('d-none');
        $(".right-side").find("#signout").addClass('d-none');
        $(".right-side").find("#authas").addClass('d-none');

        $(".right-side").find("#login").removeClass('d-none');
        $(".right-side").find("#signup").removeClass('d-none');
        $(".right-side").find("#signup").removeClass('d-none');

        $(".left-side").find("#favorites").addClass('d-none');
        $(".left-side").find("#profile").addClass('d-none');
    })
}
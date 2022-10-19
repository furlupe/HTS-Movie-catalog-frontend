function loadNavbar() {
    $.get("nav.html", function(data) {
        $("#nav-placeholder").replaceWith(data);
        $(".navbar-authorized").addClass("d-none");
        $(".navbar-unauthorized").removeClass("d-none");
    });

    var token = localStorage.getItem("userToken");
    get("https://react-midterm.kreosoft.space/api/account/profile", token)
    .then(json => {
        $(".navbar-unauthorized").addClass("d-none");
        $(".navbar-authorized").removeClass("d-none");

        $(".navbar-authorized").find("#nickname").text(json.nickName);
        $(".navbar-authorized").find("#signout").click(function () { 
            localStorage.setItem("userToken", "");
            location.reload();
        });
    }) 
    .catch(() => {
        $(".navbar-authorized").addClass("d-none");
        $(".navbar-unauthorized").removeClass("d-none");
    })
}
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
            post("https://react-midterm.kreosoft.space/api/account/logout", {})
            .then(respone => {
                localStorage.setItem("userToken", respone.token);
                location.reload();
            });
        });
    }) 
    .catch(() => {
        $(".navbar-authorized").addClass("d-none");
        $(".navbar-unauthorized").removeClass("d-none");
    })
}
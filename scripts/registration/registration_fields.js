export function registerRegisterFieldsEvent() {
    console.log($(".validable"))
    $(".validable").on("input", function(){
        $(this).removeClass("border-danger");
        $(this).parent().addClass("valid");
        $(this).parent().removeClass("invalid");
    });
}

export function areFieldsValid() {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?w+)*(.\w{2,3})+$/;
    var invalidFields = [];

    switch (true) {
        case $("#password").val().length < 6: 
            invalidFields.push("#password");
        case $("#password").val() != $("#passwordcheck").val(): 
            invalidFields.push("#passwordcheck");
        case !mailformat.test($("#email").val()):
            invalidFields.push("#email");
        case !$("#loginfield").val().length:
            invalidFields.push("#loginfield");
    };

    if (!invalidFields.length) return true;

    for (var invalidField of invalidFields) {
        $(invalidField).addClass("border-danger");
        $(invalidField).parent().removeClass("valid");
        $(invalidField).parent().addClass("invalid");
    }

    return false;
}
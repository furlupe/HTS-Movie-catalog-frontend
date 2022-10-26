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

    switch (true) {
        case $("#password").val().length < 6: // если длина пароля < 6, сообщить
            makeFieldInvalid("#password");
        case $("#password").val() != $("#passwordcheck").val(): 
            makeFieldInvalid("#passwordcheck"); // если не совпадают пароль и его подтверждение
        case !mailformat.test($("#email").val()):
            makeFieldInvalid("#email"); // неккоректный E-mail
        case !$("#loginfield").val().length:
            makeFieldInvalid("#loginfield"); // пустой логин
    };

    if (!invalidFields.length) return true;

    return false;
}

var makeFieldInvalid = (field) => {
    $(invalidField).addClass("border-danger");
    $(invalidField).parent().removeClass("valid");
    $(invalidField).parent().addClass("invalid");
}
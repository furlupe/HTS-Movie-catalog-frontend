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
    var isInvalid = true;

    if ($("#password").val().length < 6){
        makeFieldInvalid("#password"); // если длина пароля < 6, сообщить
        isInvalid = false;
    } 

    if ($("#password").val() != $("#passwordcheck").val()) {
        makeFieldInvalid("#passwordcheck"); // если не совпадают пароль и его подтверждение
        isInvalid = false;
    } 
    if (!mailformat.test($("#email").val())) {
        makeFieldInvalid("#email"); // неккоректный E-mail
        isInvalid = false;
    }

    if (!$("#loginfield").val().length) {
        makeFieldInvalid("#loginfield"); // пустой логин
        isInvalid = false;
    }
    
    return isInvalid;
}

var makeFieldInvalid = (field) => {
    $(field).addClass("border-danger");
    $(field).parent().removeClass("valid");
    $(field).parent().addClass("invalid");
}
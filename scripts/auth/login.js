// Форма входа
$(".login form").on("submit", (event) => {
    event.preventDefault() // Отключаем базовый переход

    let formEmail = $("#login-email").val().trim()
    let formPassword = $("#login-password").val().trim()

    new Promise((resolve, reject) => {
        if (!formEmail) return reject({text: "Поле с email не может быть пустым", input: $("#login-email")})
        if (!formPassword) return reject({text: "Поле с паролем не может быть пустым", input: $("#login-password")})
        resolve({email: formEmail, password: formPassword})
    })
    .then(formData => {
        // Получаем данные аккаунта
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbweKtNAk0_Q-8CdsYkv3JZpfEq6bfDkpVn9GjwxIUVUnoJpFmEr9zzB9l6z1LvNycoYXA/exec" + "?action=GetUser",
            method: "POST",
            crossDomain: true,
            data: formData,
            success: (data) => {
                data = JSON.parse(data)

                // Если ошибка входа
                if (!data.success) {
                    $(".login .form-error").text("Почта или пароль неправильные").show()
                    $("#login-email").addClass("error")
                    $("#login-password").addClass("error")
                    return
                }

                localStorage.userData = JSON.stringify(data.userData) // Сохраняем данные о входе
                window.location = "./index.html" // Переходим на главную страницу
            }
        })
    })
    .catch((error) => {
        $(".login .form-error").text(error.text).show()
        error.input.addClass("error")
    })
})

// При обновлении инпута убираем ошибку
$(".login input").on("input", () => {
    $(".login .form-error").hide()
    $(".login input").removeClass("error")
})
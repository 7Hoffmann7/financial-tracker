// Форма регистрации
$(".registration form").on("submit", (event) => {
    event.preventDefault() // Отключаем базовый переход

    let formName = $("#reg-name").val().trim()
    let formEmail = $("#reg-email").val().trim()
    let formPassword = $("#reg-password").val().trim()
    let formPasswordAgain = $("#reg-password-again").val().trim()

    let p = new Promise((resolve, reject) => {
        if (!formName) return reject({text: "Заполните имя", input: $("#reg-name")})
        if (!formEmail) return reject({text: "Заполните email", input: $("#reg-email")})
        if (!formPassword) return reject({text: "Заполните пароль", input: $("#reg-password")})
        if (formPassword.length < 4) return reject({text: "Пароль меньше 4 символов ", input: $("#reg-password")})
        if (formPassword !== formPasswordAgain) return reject({text: "Пароль не совпадает", input: $("#reg-password-again")})
        resolve()
    })
    .then(() => {
        let newUserData = { // Новый аккаунт
            id: 0, // id устанавливаем в скрипте
            name: formName,
            image: profilePicture,
            email: formEmail,
            password: formPassword,
            categories: [
                {id: 0, name: "Прочее", color: "#999999"},
                {id: 1, name: "Продукты", color: "#5863FF"},
                {id: 2, name: "Транспорт", color: "#FFC445"},
                {id: 3, name: "Здоровье", color: "#6CFF4F"},
            ],
            expenses: [],
            balance: 0,
            currency: $("#reg-currency").val()
        }

        // Регистрируем новый аккаунт
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbweKtNAk0_Q-8CdsYkv3JZpfEq6bfDkpVn9GjwxIUVUnoJpFmEr9zzB9l6z1LvNycoYXA/exec" + "?action=AddUser",
            method: "POST",
            crossDomain: true,
            data: {data: JSON.stringify(newUserData)},
            success: (data) => {
                data = JSON.parse(data)

                // Если ошибка регистрации
                if (!data.success) {
                    $(".registration .form-error").text("Email занят").show()
                    $("#reg-email").addClass("error")
                    return
                }

                // Сохраняем id который вернул сервер
                newUserData.id = data.id

                localStorage.userData = JSON.stringify(newUserData) // Сохраняем данные об аккаунте
                window.location = "./index.html" // Переходим на главную страницу
            }
        })
    })
    .catch((error) => {
        $(".registration .form-error").text(error.text).show()
        error.input.addClass("error")
    })
})

// При обновлении инпута убираем ошибку
$(".registration input").on("input", () => {
    $(".registration .form-error").hide()
    $(".registration input").removeClass("error")
})


let profilePicture

// Установка случайного изображения
function setImage() {
    let randomString = Math.random().toString(36).substring(2,7)
    profilePicture = `https://picsum.photos/seed/${randomString}/40`
    $("#reg-image").attr("src", profilePicture);
}

setImage()

// Установка нового изображения по нажатию
$("#reg-image-new").on("click tap", setImage)

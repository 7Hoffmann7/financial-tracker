// Форма смены основной информации
$(".profile-edit").on("submit", (event) => {
    event.preventDefault() // Отключаем базовый переход

    let formName = $("#edit-name").val().trim()

    if (!formName) {
        $(".profile-edit .form-error").text("Заполните имя").show()
        $("#edit-name").addClass("error")
        return
    }

    $(".profile-edit button[type=submit]").text("Сохранение").attr("disabled", true) // Блокируем кнопку

    // Меняем данные пользователя
    userData.image = profilePicture
    userData.name = formName

    // Обновляем данные
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbweKtNAk0_Q-8CdsYkv3JZpfEq6bfDkpVn9GjwxIUVUnoJpFmEr9zzB9l6z1LvNycoYXA/exec" + "?action=EditUser",
        method: "POST",
        crossDomain: true,
        data: {data: JSON.stringify(userData)},
        success: (data) => {
            data = JSON.parse(data)

            // Если ошибка обновления
            if (!data.success) {
                $(".profile-edit .form-error").text("Не удалось сохранить изменение, пожалуйста обновите страницу").show()
                $(".profile-edit button[type=submit]").text("Сохранить").removeAttr("disabled") // Разблокируем кнопку
                return
            }

            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            window.location.reload() // Перезагружаем страницу
        }
    })
})

// При обновлении инпута убираем ошибку
$(".profile-edit input").on("input", () => {
    $(".profile-edit .form-error").hide()
    $(".profile-edit input").removeClass("error")
})


let profilePicture = userData.image

// Установка случайного изображения
function setImage() {
    let randomString = Math.random().toString(36).substring(2,7)
    profilePicture = `https://picsum.photos/seed/${randomString}/40`
    $("#edit-image").attr("src", profilePicture);
}

// Установка нового изображения по нажатию
$("#edit-image-new").on("click tap", setImage)


// Форма смены валюты
$(".profile-edit-currency").on("submit", (event) => {
    event.preventDefault() // Отключаем базовый переход

    $(".profile-edit-currency button[type=submit]").text("Сохранение").attr("disabled", true) // Блокируем кнопку

    // Меняем данные пользователя
    userData.expenses = []
    userData.currency = $("#profile-currency").val()

    // Обновляем данные
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbweKtNAk0_Q-8CdsYkv3JZpfEq6bfDkpVn9GjwxIUVUnoJpFmEr9zzB9l6z1LvNycoYXA/exec" + "?action=EditUser",
        method: "POST",
        crossDomain: true,
        data: {data: JSON.stringify(userData)},
        success: (data) => {
            data = JSON.parse(data)

            // Если ошибка обновления
            if (!data.success) {
                $(".profile-edit-currency .form-error").text("Не удалось сохранить изменение, пожалуйста обновите страницу").show()
                $(".profile-edit-currency button[type=submit]").text("Сохранить").removeAttr("disabled") // Разблокируем кнопку
                return
            }

            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            window.location.reload() // Перезагружаем страницу
        }
    })
})
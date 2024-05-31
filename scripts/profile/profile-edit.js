$(".profile-edit").on("submit", (event) => {
    event.preventDefault() // Отключаем базовый переход

    let formName = $("#edit-name").val().trim()

    if (!formName) {
        $(".form-error").text("Заполните имя").show()
        $("#edit-name").addClass("error")
        return
    }

    $("#form-submit").text("Сохранение").attr("disabled", true) // Блокируем кнопку

    // Меняем данные пользователя
    userData.image = profilePicture
    userData.name = formName

    // Обновляем данные
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxxxdLPIglnlPfLzPd3OqRFM8tGav0hVQcgr7xJq18tYmQly0FxTdz5mo_eZFTe2r_xJg/exec" + "?action=EditUser",
        method: "POST",
        crossDomain: true,
        data: {data: JSON.stringify(userData)},
        success: (data) => {
            data = JSON.parse(data)

            // Если ошибка обновления
            if (!data.success) {
                alert("Не удалось сохранить изменение, пожалуйста обновите страницу")
                $("#form-submit").text("Сохранить").removeAttr("disabled") // Разблокируем кнопку
                return
            }

            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            window.location.reload() // Перезагружаем страницу
        }
    })
})

// При обновлении инпута убираем ошибку
$(".profile-edit input").on("input", () => {
    $(".form-error").hide()
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
$(".balance-form").on("submit", (event) => { 
    event.preventDefault() // Отключаем базовый переход

    let balance = $("#balance-input").val()

    new Promise((resolve, reject) => {
        // Отбрасываем минус в подсчете символов
        let _balance = balance.startsWith("-") ? balance.substring(1) : balance

        if (_balance.length > 15) return reject("Баланс не может превышать 15 цифр")
        if (_balance.length !== 1 && _balance.startsWith("0")) return reject("Баланс не может начинаться с 0")
        if (isNaN(_balance)) return reject("Баланс должен содержать только число")

        if (balance.length === 0) {
            balance = 0
        } else {
            balance = parseFloat(balance)
        }

        resolve(balance)
    })
    .then(balance => {
        $("#form-submit").text("Сохранение").attr("disabled", true) // Блокируем кнопку
        userData.balance = balance

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
                    $(".form-error").text("Не удалось сохранить изменение, пожалуйста обновите страницу").show()
                    $("#form-submit").text("Сохранить").removeAttr("disabled") // Разблокируем кнопку
                    return
                }

                localStorage.userData = JSON.stringify(userData) // Сохраняем данные об аккаунте
                window.location = "./index.html" // Переходим на главную страницу
            }
        })
    })
    .catch(error => {
        $(".form-error").text(error).show()
        $("#balance-input").addClass("error")
    })
})

// При обновлении инпута убираем ошибку
$(".balance-form input").on("input", () => {
    $(".balance-form .form-error").hide()
    $(".balance-form input").removeClass("error")
})

// Кнопка отмены
$("#cancel").on("click tap", () => {
    window.location = "./index.html" // Переходим на главную страницу
})
$(".add-expens-form").on("submit", (event) => { 
    event.preventDefault() // Отключаем базовый переход

    let sum = $("#expens-sum").val()

    new Promise((resolve, reject) => {
        if (sum.startsWith("-")) return reject("Сумма не должна начинаться с минуса")
        if (sum.length > 15) return reject("Сумма не может превышать 15 цифр")
        if (sum.length !== 1 && sum.startsWith("0")) return reject("Сумма не может начинаться с 0")
        if (isNaN(sum)) return reject("Сумма должен содержать только число")

        if (sum.length === 0) {
            sum = 0
        } else {
            sum = parseInt(sum)
        }

        resolve(sum)
    })
    .then(sum => {
        $("#form-submit").text("Сохранение").attr("disabled", true) // Блокируем кнопку

        // Меняем данные пользователя
        userData.balance = userData.balance - sum

        // Новое id - следующее после последнего элемента
        let categoryId = $(".category-button.selected").attr("id").replace("category-", "")

        // Новое id - следующее после последнего элемента
        let expensId = userData.expenses.length
            ? userData.expenses[userData.expenses.length - 1].id + 1 
            : 0 // Если массив пустой - id 0

        // Добавляем расход в список пользователя
        userData.expenses.push({
            id: expensId,
            category_id: parseInt(categoryId),
            sum: sum
        })


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
                window.location = "./index.html" // Переходим на главную страницу
            }
        })
    })
    .catch(error => {
        $(".form-error").text(error).show()
        $("#expens-sum").addClass("error")
    })
})


// При обновлении инпута убираем ошибку
$(".add-expens-form input").on("input", () => {
    $(".add-expens-form .form-error").hide()
    $(".add-expens-form input").removeClass("error")
})

// Выбор категории
$(".categories").on("click tap", "button", (event) => {
    $(event.target).addClass("selected").siblings().removeClass("selected");
})

// Кнопка отмены
$("#cancel").on("click tap", () => {
    window.location = "./index.html" // Переходим на главную страницу
})
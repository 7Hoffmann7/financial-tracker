// Случайная hex строка
function genHexColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
}

// Устанавливаем случайный цвет в добавлении категории
$("#new-category-color").val(genHexColor())


// Добавление категории
$(".category__add").on("click tap", () => {
    $("section .button-image").attr("disabled", true) // Блокируем кнопку
    $("#new-category-message").addClass("show") // Показываем сообщение

    // Новое id - следующее после последнего элемента
    let categoryId = userData.categories.length
        ? userData.categories[userData.categories.length - 1].id + 1 
        : 0 // Если массив пустой - id 0

    let newCategoryColor = $("#new-category-color").val() || "#000000"
    let newCategoryName = $("#new-category-name").val() || "Без названия"

    // Добавляем категорию в список пользователя
    userData.categories.push({
        id: categoryId,
        name: newCategoryName,
        color: newCategoryColor
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
                return
            }

            $("section .button-image").removeAttr("disabled") // Разблокируем кнопку
            $("#new-category-message").removeClass("show") // Скрываем сообщение
            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            renderCategories(userData.categories) // Рендерим список заново

            // Ставим случайный цвет и пустое имя в добавлении категории
            $("#new-category-color").val(genHexColor())
            $("#new-category-name").val("")
        }
    })
})


// Удаление категории
$(".categories").on("click tap", ".category__remove", (event) => {
    $("section .button-image").attr("disabled", true) // Блокируем кнопку
    $("#new-category-message").addClass("show") // Показываем сообщение

    // Получаем id выбранной категории
    let categoryId = $(event.target).closest(".category").attr("id").replace("category-", "")

    // Удаляем категорию из списка у пользователя
    userData.categories = userData.categories.filter((category) => {return category.id !== parseInt(categoryId)})
    
    // У расходов для которых удалили категорию ставим id 0
    userData.expenses.forEach((expens, i) => {
        if (expens.category_id === parseInt(categoryId)) {
            console.log(userData.expenses[i].category_id);
            userData.expenses[i].category_id = 0
        }
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
                return
            }

            $("section .button-image").removeAttr("disabled") // Разблокируем кнопку
            $("#new-category-message").removeClass("show") // Скрываем сообщение
            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            renderCategories(userData.categories) // Рендерим список заново
        }
    })
})


// Изменение категории
$(".categories").on("change", "input", (event) => {
    $("section .button-image").attr("disabled", true) // Блокируем кнопку
    $("#new-category-message").addClass("show") // Показываем сообщение
    
    // Получаем id выбранной категории
    let categoryId = $(event.target).closest(".category").attr("id").replace("category-", "")

    // Находим категорию и меняем у нее цвет и название на новые
    let categoryIndex = userData.categories.findIndex((category) => category.id === parseInt(categoryId))
    userData.categories[categoryIndex].color = $(`#category-${categoryId} .category__color`).val() || "#000000"
    userData.categories[categoryIndex].name = $(`#category-${categoryId} .category__name`).val() || "Без названия"

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
                return
            }

            $("section .button-image").removeAttr("disabled") // Разблокируем кнопку
            $("#new-category-message").removeClass("show") // Скрываем сообщение
            localStorage.userData = JSON.stringify(userData) // Сохраняем данные
            renderCategories(userData.categories) // Рендерим список заново
        }
    })
})

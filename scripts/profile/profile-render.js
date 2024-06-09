if (!userData) {
    window.location = "./index.html" // Переходим на главную страницу
} else {
    $("section").removeClass("hidden")

    // Заполнение формы изменения профиля
    $("#edit-image").attr("src", userData.image)
    $("#edit-name").val(userData.name)

    // Устанавливаем текущую валюту и удаляем ее из списка выбора
    switch (userData.currency) {
        case "₽":
            $("#profile-currency-current").text("Текущая валюта: Рубль (₽)")
            $("#profile-currency option[value='₽']").remove()
            break;
        case "$":
            $("#profile-currency-current").text("Текущая валюта: Доллар ($)")
            $("#profile-currency option[value='$']").remove()
            break;
        case "€":
            $("#profile-currency-current").text("Текущая валюта: Евро (€)")
            $("#profile-currency option[value='€']").remove()
            break;
        default:
            break;
    }
}
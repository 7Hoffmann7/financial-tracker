if (!userData) {
    window.location = "./index.html" // Переходим на главную страницу
} else {
    $("section").removeClass("hidden")

    // Заполнение формы изменения профиля
    $("#edit-image").attr("src", userData.image);
    $("#edit-name").val(userData.name)
}
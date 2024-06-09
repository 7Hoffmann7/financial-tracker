if (!userData) {
    window.location = "./index.html" // Переходим на главную страницу
} else {
    $("section").removeClass("hidden")

    $("#balance-input").val(userData.balance);
    $("#balance-input-currency").text(userData.currency);
}
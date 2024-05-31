// Переход на регистрацию
$("#go-to-registration").on("click tap", () => {
    $(".login").hide()
    $(".registration").show()
})

// Переход на вход
$("#go-to-login").on("click tap", () => {
    $(".login").show()
    $(".registration").hide()
})
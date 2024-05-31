// Выход из профиля
$("#profile-exit").on("click tap", () => {
    delete localStorage.userData
    window.location = "./index.html"
})
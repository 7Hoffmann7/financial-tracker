// Сохраненный аккаунт - используется на каждой странице
let userData = localStorage.userData ? JSON.parse(localStorage.userData) : null

$("nav").html(`
    <ul>
        <li>
            <a href="./index.html">Расходы</a>
        </li>
        <li>
            <a href="./categories.html">Категории</a>
        </li>
        <li>
            ${userData
                ? `<a href="./profile.html"><img src="${userData.image}" alt="profile-image"><p>${userData.name}</p></a>`
                : `<a href="./auth.html">Войти</a>`
            }
        </li>
    </ul>
`)


// Если аккаунт сохранен - постоянная проверка на актуальность информации
if (userData) {
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbweKtNAk0_Q-8CdsYkv3JZpfEq6bfDkpVn9GjwxIUVUnoJpFmEr9zzB9l6z1LvNycoYXA/exec" + "?action=GetUser",
        method: "POST",
        crossDomain: true,
        data: {email: userData.email, password: userData.password},
        success: (data) => {
            data = JSON.parse(data)

            // Если ошибка входа
            if (!data.success) {
                localStorage.clear()
                window.location = "./auth.html" // Переходим на страницу авторизации
                return
            }

            // Если успех
            console.log("auth-user: success");
            localStorage.userData = JSON.stringify(data.userData) // Обновляем данные
        }
    })
}


if (!userData) {
    window.location = "./index.html" // Переходим на главную страницу
} else {
    $("section").removeClass("hidden")

    $("#expens-sum-currency").text(userData.currency) // Символ валюты после поля с суммой
    $("#expens-balance").text(`Баланс: ${userData.balance} ${userData.currency}`) // Баланс
    
    renderCategories(userData.categories)
}

// Рендер кнопок с категориями
function renderCategories(categories) {
    categories.forEach(category => {
        $(".categories").append(`
            <button type="button" class="category-button ${category.id === 0 ? "selected" : ""}" id="category-${category.id}">
                <div class="category__color" style="background-color: ${category.color};"></div>
                <p class="category__name">${category.name}</p>
            </button>
        `)
    })
}
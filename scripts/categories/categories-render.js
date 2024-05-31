if (!userData) {
    $("#reminder").removeClass("hidden")
} else {
    $("#reminder").remove()
    $("section").removeClass("hidden")

    renderCategories(userData.categories)
}

// Функция рендера категорий
function renderCategories(categories) {
    $(".categories").empty()
    categories.forEach(category => {
        if (category.id !== 0) { // "Без категории" не рендерим что бы нельзя было изменить
            $(".categories").append(`
                <div class="category" id="category-${category.id}">
                    <input type="color" class="category__color" value="${category.color}">
                    <input type="text" class="category__name" value="${category.name}">
                    <button class="category__remove button-red button-image"><img src="./assets/icons/delete.svg" alt="delete"></button>
                </div>
            `)
        }
    })
}
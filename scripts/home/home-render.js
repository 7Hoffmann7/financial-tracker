if (!userData) {
    $("#reminder").removeClass("hidden")
} else {
    $("#reminder").remove()
    $("section").removeClass("hidden")


    // Отображение баланса
    $(".balance__text").text(userData.balance + " ₽")
    if (userData.balance > 0) {
        $(".balance").removeClass("balance_gray").addClass("balance_green")
    }

    if (userData.balance < 0) {
        $(".balance").removeClass("balance_gray").addClass("balance_red")
    }

    // Отображение расходов
    renderExpenses(userData.expenses)

    // Отображение категорий
    renderCategories(userData.expenses)
}

// Отображение расходов
function renderExpenses(expenses) {
    $(".expenses-list").empty()
    expenses.forEach(expens => {
        let category = userData.categories.find(category => category.id === expens.category_id)
        $(".expenses-list").prepend(`
            <div class="expenses" id="expens-${expens.id}">
                <div class="expenses__color" style="background-color: ${category.color};"></div>
                <div class="expenses__name">${category.name}</div>
                <div class="expenses__prise">${expens.sum} ₽</div>
            </div>
        `)
    })
}

// Отображение расходов
function renderCategories(expenses) {
    let categories = [...userData.categories]
    let total = 0
    
    // Считаем общую цену
    expenses.forEach(expens => total += expens.sum)

    categories.forEach((category, i) => {
        // Получаем все расходы связанные с этой категорией
        let category_expenses = expenses.filter(expens => expens.category_id === category.id)

        // Складываем все расходы
        categories[i].sum = 0
        category_expenses.forEach(expens => categories[i].sum += expens.sum)

        // Если сумма не нулевая - приводим к процентам
        if (categories[i].sum) {
            
            categories[i].percent = (categories[i].sum / total) * 100
        } else {
            categories[i].percent = 0
        }
    })

    // Сортируем
    categories.sort((a,b) => a.percent - b.percent)

    $(".categories-list").empty()
    categories.forEach(category => {
        $(".categories-list").prepend(`
            <div class="category">
                <div class="category__color" style="background-color: ${category.color};"></div>
                <p class="category__name">${category.name}</p>
                <div class="flex-col category__prise">
                    <p>${category.sum} <span>₽</span></p>
                    <p>${category.percent.toFixed(1)} <span>%</span></p>
                </div>
            </div>
        `)
    })
}

// Данные о кошках и некоторые функции управления массивом

let catsDatabase = [
    {
        id: 1,
        name: "Мурка",
        age: "2 года",
        src: "images/cat1.jpeg",
        description: "Спокойная и ласковая кошечка",
        status: "available",
        statusText: "Доступна для усыновления",
        character: "Дружелюбная, любит детей. Отлично ладит с другими животными.",
        health: "Здорова, все прививки сделаны. Стерилизована.",
        color: "Рыжая",
        weight: "3.5 кг",
        story: "Мурка была найдена на улице в плохом состоянии. После лечения и реабилитации она превратилась в прекрасную домашнюю кошечку, которая ждёт своих любящих хозяев."
    },
    {
        id: 2,
        name: "Барсик",
        age: "3 года",
        src: "images/cat2.jpeg",
        description: "Игривый и энергичный кот",
        status: "adopted",
        statusText: "Уже нашёл дом",
        character: "Активный, любит играть. Требует много внимания.",
        health: "Здоров, кастрирован. Все прививки актуальны.",
        color: "Серый полосатый",
        weight: "4.2 кг",
        story: "Барсик был домашним котом, но владельцы не смогли его содержать. Теперь он счастливо живёт в новой семье!"
    },
    {
        id: 3,
        name: "Снежинка",
        age: "1 год",
        src: "images/cat3.jpeg",
        description: "Нежная белоснежная красавица",
        status: "available",
        statusText: "Доступна для усыновления",
        character: "Застенчивая, но очень ласковая. Привязывается к одному человеку.",
        health: "Здорова, стерилизована. Первые прививки сделаны.",
        color: "Белая",
        weight: "3.0 кг",
        story: "Снежинка родилась в приюте. Она очень нежная и ищет спокойный дом без маленьких детей."
    },
    {
        id: 4,
        name: "Тигр",
        age: "4 года",
        src: "images/cat4.jpeg",
        description: "Величественный полосатый кот",
        status: "medical",
        statusText: "На лечении",
        character: "Независимый, но добрый. Предпочитает спокойствие.",
        health: "Восстанавливается после операции. Требуется особый уход.",
        color: "Рыже-полосатый",
        weight: "5.1 кг",
        story: "Тигр попал к нам с травмой лапы. Сейчас идёт на поправку и скоро будет готов к усыновлению."
    },
    {
        id: 5,
        name: "Луна",
        age: "5 месяцев",
        src: "images/cat5.jpeg",
        description: "Милый игривый котёнок",
        status: "available",
        statusText: "Доступна для усыновления",
        character: "Очень игривая, любопытная. Полна энергии!",
        health: "Здорова, первые прививки сделаны. Стерилизация запланирована.",
        color: "Чёрная",
        weight: "2.1 кг",
        story: "Луна - один из котят, родившихся в приюте. Она очень активная и нуждается в семье, которая даст ей много любви и игр."
    },
    {
        id: 6,
        name: "Рыжик",
        age: "6 лет",
        src: "images/cat6.jpeg",
        description: "Мудрый и спокойный кот",
        status: "available",
        statusText: "Доступен для усыновления",
        character: "Спокойный, идеален для пожилых людей. Любит спать на солнце.",
        health: "Здоров, все прививки актуальны. Кастрирован.",
        color: "Рыжий",
        weight: "4.8 кг",
        story: "Рыжик потерял своих хозяев и теперь ищет новый дом. Он очень спокойный и будет идеальным компаньоном."
    }
];

let nextId = 7;

// Получить массив кошек полностью
export function getAllCats() {
    return [...catsDatabase];
}

// Получить кошку по ID
export function getCatById(id) {
    return catsDatabase.find(cat => cat.id === parseInt(id));
}

// Добавить новую кошку
export function addCat(catData = null) {
    const newCat = catData || {
        id: nextId++,
        name: "Новая кошка",
        age: "1 год",
        src: "images/placeholder.jpeg",
        description: "Описание не заполнено",
        status: "available",
        statusText: "Доступна для усыновления",
        character: "Характер не указан",
        health: "Информация о здоровье отсутствует",
        color: "Не указан",
        weight: "Не указан",
        story: "История не заполнена"
    };
    
    if (catData) {
        newCat.id = nextId++;
    }
    
    catsDatabase.push(newCat);
    return newCat;
}

// Удалить кошку
export function deleteCat(id) {
    const index = catsDatabase.findIndex(cat => cat.id === parseInt(id));
    if (index !== -1) {
        catsDatabase.splice(index, 1);
        return true;
    }
    return false;
}

// Обновить данные о кошке
export function updateCat(id, updatedData) {
    const index = catsDatabase.findIndex(cat => cat.id === parseInt(id));
    if (index !== -1) {
        catsDatabase[index] = { ...catsDatabase[index], ...updatedData };
        return catsDatabase[index];
    }
    return null;
}

// Сброс к начальным данным (для перезапуска)
export function resetDatabase() {
    // Можно добавить логику сброса, если нужно
    nextId = 7;
}
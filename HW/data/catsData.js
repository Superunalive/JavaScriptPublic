// data/catsData.js

const STORAGE_KEY = 'catShelterData';

const catsDB = [
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

const MIN_CATS = 1;
const MAX_CATS = 20;

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                cats: parsed.cats || [...catsDB],
                nextId: parsed.nextId || 7
            };
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
    return {
        cats: [...catsDB],
        nextId: 7
    };
}

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            cats: catsDatabase,
            nextId: nextId
        }));
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
    }
}

let catsDatabase;
let nextId;

const loaded = loadFromStorage();
catsDatabase = loaded.cats;
nextId = loaded.nextId;

export function getAllCats() {
    return [...catsDatabase];
}

export function getCatById(id) {
    try {
        return catsDatabase.find(cat => cat.id === parseInt(id));
    } catch (error) {
        console.error('Ошибка получения кошки:', error);
        return undefined;
    }
}

export function addCat(catData = null) {
    try {
        if (catsDatabase.length >= MAX_CATS) {
            return null;
        }
        
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
        saveToStorage();
        return newCat;
    } catch (error) {
        console.error('Ошибка добавления кошки:', error);
        return null;
    }
}

export function deleteCat(id) {
    try {
        if (catsDatabase.length <= MIN_CATS) {
            return false;
        }
        
        const index = catsDatabase.findIndex(cat => cat.id === parseInt(id));
        if (index !== -1) {
            catsDatabase.splice(index, 1);
            saveToStorage();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Ошибка удаления кошки:', error);
        return false;
    }
}

export function updateCat(id, updatedData) {
    try {
        const index = catsDatabase.findIndex(cat => cat.id === parseInt(id));
        if (index !== -1) {
            catsDatabase[index] = { ...catsDatabase[index], ...updatedData };
            saveToStorage();
            return catsDatabase[index];
        }
        return null;
    } catch (error) {
        console.error('Ошибка обновления кошки:', error);
        return null;
    }
}

export function getCatsCount() {
    return catsDatabase.length;
}

export function canAddCat() {
    return catsDatabase.length < MAX_CATS;
}

export function canDeleteCat() {
    return catsDatabase.length > MIN_CATS;
}

export function resetDatabase() {
    try {
        catsDatabase = [...catsDB];
        nextId = 7;
        saveToStorage();
        return true;
    } catch (error) {
        console.error('Ошибка сброса базы данных:', error);
        return false;
    }
}
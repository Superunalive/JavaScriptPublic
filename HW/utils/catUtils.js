// utils/catUtils.js

/**
 * Сравнивает кошек по важным характеристикам:
 * возраст, характер, статус здоровья
 * (не сравнивает имя, id, фото)
 */
export function isEqualObj(cat1, cat2) {
    const importantFields = ['age', 'character', 'health', 'status'];
    
    for (let field of importantFields) {
        if (cat1[field] !== cat2[field]) {
            return false;
        }
    }
    return true;
}

/**
 * Преобразует возраст в месяцы для унификации
 */
function parseAgeToMonths(ageString) {
    const yearMatch = ageString.match(/(\d+)\s*(год|года|лет)/);
    const monthMatch = ageString.match(/(\d+)\s*месяц/);
    
    let months = 0;
    if (yearMatch) {
        months += parseInt(yearMatch[1]) * 12;
    }
    if (monthMatch) {
        months += parseInt(monthMatch[1]);
    }
    
    return months;
}

/**
 * Возвращает сумму квадратов возрастов кошек (в месяцах)
 * Используется для статистики приюта
 */
export function sumOfSquares(cats) {
    let sum = 0;
    let index = 0;
    
    // Цикл while с постусловием
    while (index < cats.length) {
        const ageInMonths = parseAgeToMonths(cats[index].age);
        sum += ageInMonths * ageInMonths;
        index++;
    }
    
    return sum;
}

/**
 * Универсальное сравнение значений
 */
export function isEqual(value1, value2) {
    if (typeof value1 !== typeof value2) return false;
    
    if (value1 === null || value2 === null) {
        return value1 === value2;
    }
    
    if (typeof value1 === 'string' || typeof value1 === 'number' || typeof value1 === 'boolean') {
        return value1 === value2;
    }
    
    if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) return false;
        
        for (let i = 0; i < value1.length; i++) {
            if (!isEqual(value1[i], value2[i])) return false;
        }
        return true;
    }
    
    if (typeof value1 === 'object' && typeof value2 === 'object') {
        return isEqualObj(value1, value2);
    }
    
    return false;
}

/**
 * Группирует кошек по анаграммам имен
 * Например: "Мурка" и "Крума" - анаграммы
 */
export function anagram(names) {
    // Map - коллекция ключ-значение
    const groups = new Map();
    
    // Set используется для проверки уникальности
    const processed = new Set();
    
    for (let name of names) {
        const normalized = name.toLowerCase().replace(/\s/g, '');
        const sorted = normalized.split('').sort().join('');
        
        if (!groups.has(sorted)) {
            groups.set(sorted, []);
        }
        
        if (!processed.has(name)) {
            groups.get(sorted).push(name);
            processed.add(name);
        }
    }
    
    // Возвращаем только группы из 2+ слов, отсортированные
    const result = [];
    for (let group of groups.values()) {
        if (group.length >= 2) {
            result.push(group.sort());
        }
    }
    
    return result.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Находит похожих кошек (по характеристикам)
 */
export function findSimilarCats(targetCat, allCats) {
    const similar = [];
    
    for (let cat of allCats) {
        if (cat.id !== targetCat.id && isEqualObj(cat, targetCat)) {
            similar.push(cat);
        }
    }
    
    return similar;
}
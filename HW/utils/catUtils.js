// utils/catUtils.js

/**
 * 1. Сравнивает двух кошек по важным характеристикам
 * (возраст, характер, статус - игнорирует id, имя, фото)
 */
export function isEqualObj(cat1, cat2) {
    const importantFields = ['age', 'character', 'status', 'color'];
    
    // Цикл с повторениями (for...of)
    for (let field of importantFields) {
        if (cat1[field] !== cat2[field]) {
            return false;
        }
    }
    return true;
}

/**
 * 2. Преобразует возраст в месяцы
 */
function parseAgeToMonths(ageString) {
    const yearMatch = ageString.match(/(\d+)\s*(год|года|лет)/);
    const monthMatch = ageString.match(/(\d+)\s*(месяц|месяца|месяцов)/);
    
    let months = 0;
    if (yearMatch) {
        months += parseInt(yearMatch[1]) * 12;
    }
    if (monthMatch) {
        months += parseInt(monthMatch[1]);
    }
    
    return months || 12; // По умолчанию 1 год если не распознано
}

/**
 * 3. Сумма квадратов возрастов кошек (в месяцах)
 * Используется для статистики приюта
 */
export function sumOfSquares(cats) {
    let sum = 0;
    let index = 0;
    
    // Цикл с постусловием (while)
    while (index < cats.length) {
        const ageInMonths = parseAgeToMonths(cats[index].age);
        sum += ageInMonths * ageInMonths;
        index++;
    }
    
    return sum;
}

/**
 * 4. Универсальное сравнение любых значений
 */
export function isEqual(value1, value2) {
    // Строки
    if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1 === value2;
    }
    
    // Массивы
    if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) return false;
        
        for (let i = 0; i < value1.length; i++) {
            if (!isEqual(value1[i], value2[i])) return false;
        }
        return true;
    }
    
    // Объекты (используем isEqualObj)
    if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
        return isEqualObj(value1, value2);
    }
    
    return value1 === value2;
}

/**
 * 5. Группировка имен кошек по анаграммам
 * Возвращает только группы из 2+ имен
 */
export function anagram(names) {
    // Map - коллекция ключ-значение
    const groups = new Map();
    
    // Set - для уникальности
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
    
    // Только группы из 2+ имен, отсортированные
    const result = [];
    for (let group of groups.values()) {
        if (group.length >= 2) {
            result.push(group.sort());
        }
    }
    
    return result.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * 6. Найти похожих кошек (используя isEqualObj)
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
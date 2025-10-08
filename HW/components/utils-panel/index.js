import { findSimilarCats, sumOfSquares, anagram } from "../../utils/catUtils.js";
import { AlertComponent } from "../alert/index.js";

export class UtilsPanelComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="utils-panel mt-4">
                <h4>Дополнительная информация</h4>
                <button class="btn btn-primary utils-button" id="find-similar">
                    Найти похожих кошек
                </button>
                <button class="btn btn-primary utils-button" id="show-stats">
                    Статистика приюта
                </button>
                <button class="btn btn-primary utils-button" id="check-anagrams">
                    Проверить анаграммы имён
                </button>
                <div id="utils-results" class="mt-3"></div>
            </div>
        `;
    }

    addListeners(currentCat, allCats) {
        document.getElementById('find-similar').addEventListener('click', () => {
            const similar = findSimilarCats(currentCat, allCats);
            const resultsDiv = document.getElementById('utils-results');
            resultsDiv.innerHTML = '';
            
            if (similar.length > 0) {
                const names = similar.map(cat => cat.name).join(', ');
                const alert = new AlertComponent(resultsDiv);
                alert.render('info', `Похожие кошки по характеристикам: ${names}`);
            } else {
                const alert = new AlertComponent(resultsDiv);
                alert.render('secondary', 'Нет кошек с такими же характеристиками');
            }
        });

        document.getElementById('show-stats').addEventListener('click', () => {
            const sum = sumOfSquares(allCats);
            const resultsDiv = document.getElementById('utils-results');
            resultsDiv.innerHTML = '';
            
            const alert = new AlertComponent(resultsDiv);
            alert.render('info', `Сумма квадратов возрастов всех кошек: ${sum} (возраст в месяцах)`);
        });

        document.getElementById('check-anagrams').addEventListener('click', () => {
            const names = allCats.map(cat => cat.name);
            const groups = anagram(names);
            const resultsDiv = document.getElementById('utils-results');
            resultsDiv.innerHTML = '';
            
            if (groups.length > 0) {
                const text = groups.map(group => group.join(', ')).join(' | ');
                const alert = new AlertComponent(resultsDiv);
                alert.render('info', `Найдены анаграммы: ${text}`);
            } else {
                const alert = new AlertComponent(resultsDiv);
                alert.render('secondary', 'Анаграммы среди имён не найдены');
            }
        });
    }

    render(currentCat, allCats) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(currentCat, allCats);
    }
}
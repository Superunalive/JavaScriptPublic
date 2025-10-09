// components/utils-panel/index.js

import { findSimilarCats, anagram } from "../../utils/catUtils.js";
import { getAllCats } from "../../data/catsData.js";
import { AlertComponent } from "../alert/index.js";

export class UtilsPanelComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title" style="color: var(--bgg-purple);">🔍 Дополнительный анализ</h4>
                    <p class="text-muted">Используйте инструменты для поиска похожих кошек и анализа имён</p>
                    
                    <button class="btn btn-primary me-2 mb-2" id="find-similar-btn">
                        👥 Найти похожих кошек
                    </button>
                    <button class="btn btn-primary mb-2" id="check-anagrams-btn">
                        🔤 Проверить анаграммы имён
                    </button>
                    
                    <div id="utils-results" class="mt-3"></div>
                </div>
            </div>
        `;
    }

    addListeners(currentCat) {
        document.getElementById('find-similar-btn').addEventListener('click', () => {
            const allCats = getAllCats();
            const similar = findSimilarCats(currentCat, allCats);
            const resultsDiv = document.getElementById('utils-results');
            resultsDiv.innerHTML = '';
            
            const alert = new AlertComponent(resultsDiv);
            
            if (similar.length > 0) {
                const names = similar.map(cat => cat.name).join(', ');
                alert.render('success', `<strong>Найдены похожие кошки:</strong><br>${names}<br><small>Совпадают по возрасту, характеру, статусу и окрасу</small>`);
            } else {
                alert.render('info', 'Не найдено кошек с такими же характеристиками');
            }
        });

        document.getElementById('check-anagrams-btn').addEventListener('click', () => {
            const allCats = getAllCats();
            const names = allCats.map(cat => cat.name);
            const groups = anagram(names);
            const resultsDiv = document.getElementById('utils-results');
            resultsDiv.innerHTML = '';
            
            const alert = new AlertComponent(resultsDiv);
            
            if (groups.length > 0) {
                const text = groups.map(group => group.join(' ↔️ ')).join('<br>');
                alert.render('success', `<strong>Найдены анаграммы:</strong><br>${text}`);
            } else {
                alert.render('info', 'Анаграммы среди имён кошек не найдены');
            }
        });
    }

    render(currentCat) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(currentCat);
    }
}
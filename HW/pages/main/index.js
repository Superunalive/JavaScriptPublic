// pages/main/index.js

import { CatCardComponent } from "../../components/cat-card/index.js";
import { CatPage } from "../cat/index.js";
import { NotificationComponent } from "../../components/notification/index.js";
import { sumOfSquares } from "../../utils/catUtils.js";
import { getAllCats, addCat, deleteCat, canAddCat, canDeleteCat, getCatsCount, resetDatabase } from "../../data/catsData.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.notification = new NotificationComponent(); // ВАЖНО: должно быть здесь!
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get toolbarRoot() {
        return document.getElementById('toolbar');
    }

    getHTML() {
    const catsCount = getCatsCount();
    const canAdd = canAddCat();
    
    return `
        <div id="toolbar" class="toolbar">
            <div>
                <h5>Управление приютом</h5>
                <small class="text-muted">Кошек в приюте: ${catsCount}</small>
            </div>
            <div>
                <button 
                    class="btn btn-info me-2" 
                    id="stats-btn"
                    title="Показать статистику приюта"
                >
                    📊 Статистика
                </button>
                <button 
                    class="btn btn-success me-2" 
                    id="add-cat-btn"
                    ${!canAdd ? 'disabled' : ''}
                    title="${!canAdd ? 'Приют заполнен' : 'Добавить новую кошку'}"
                >
                    ➕ Добавить кошку
                </button>
                <button 
                    class="btn btn-warning" 
                    id="reset-btn"
                    title="Сбросить до начального состояния"
                >
                    🔄 Сбросить
                </button>
            </div>
        </div>
        <div id="main-page" class="row"></div>
    `;
    }

    clickCard(e) {
        try {
            const cardId = e.target.dataset.id;
            const catPage = new CatPage(this.parent, cardId);
            catPage.render();
        } catch (error) {
            console.error('Ошибка при открытии карточки:', error);
            this.notification.show('Не удалось открыть информацию о кошке', 'danger');
        }
    }

    clickAddCat() {
        try {
            const newCat = addCat();
            
            if (newCat) {
                this.render();
                this.notification.show('Кошка успешно добавлена в приют!', 'success');
            } else {
                this.notification.show('Приют заполнен! Максимум 20 кошек.', 'warning');
            }
        } catch (error) {
            console.error('Ошибка при добавлении кошки:', error);
            this.notification.show('Произошла ошибка при добавлении кошки', 'danger');
        }
    }

    clickDeleteCat(e) {
        try {
            const catId = e.target.dataset.id;
            
            if (!canDeleteCat()) {
                this.notification.show('Нельзя удалить последнюю кошку!', 'warning');
                return;
            }
            
            if (confirm('Вы уверены, что хотите удалить эту кошку из приюта?')) {
                const success = deleteCat(catId);
                
                if (success) {
                    this.render();
                    this.notification.show('Кошка удалена из приюта', 'info');
                } else {
                    this.notification.show('Не удалось удалить кошку', 'danger');
                }
            }
        } catch (error) {
            console.error('Ошибка при удалении кошки:', error);
            this.notification.show('Произошла ошибка при удалении кошки', 'danger');
        }
    }

    clickReset() {
        if (confirm('Вы уверены, что хотите сбросить приют до начального состояния? Все изменения будут потеряны!')) {
            try {
                const success = resetDatabase();
                
                if (success) {
                    this.render();
                    this.notification.show('База данных сброшена до начального состояния', 'success');
                } else {
                    this.notification.show('Не удалось сбросить базу данных', 'danger');
                }
            } catch (error) {
                console.error('Ошибка при сбросе базы данных:', error);
                this.notification.show('Произошла ошибка при сбросе базы данных', 'danger');
            }
        }
    }

    clickStats() {
    try {
        const allCats = getAllCats();
        const sum = sumOfSquares(allCats);
        const count = allCats.length;
        const avgAge = Math.sqrt(sum / count).toFixed(1);
        
        this.notification.show(
            `📊 Статистика приюта:<br>` +
            `Сумма квадратов возрастов: ${sum} мес²<br>` +
            `Средний возраст (RMS): ${avgAge} месяцев<br>` +
            `Всего кошек: ${count}`,
            'info',
            6000
        );
    } catch (error) {
        console.error('Ошибка при расчёте статистики:', error);
        this.notification.show('Ошибка при расчёте статистики', 'danger');
    }
    }

    addListeners() {
        document.getElementById('stats-btn').addEventListener('click', () => {
            this.clickStats();
        });

        document.getElementById('add-cat-btn').addEventListener('click', () => {
            this.clickAddCat();
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.clickReset();
        });
    }

    render() {
        try {
            this.parent.innerHTML = '';
            const html = this.getHTML();
            this.parent.insertAdjacentHTML('beforeend', html);

            this.addListeners();

            const data = getAllCats();
            data.forEach((item) => {
                const catCard = new CatCardComponent(this.pageRoot);
                catCard.render(item, this.clickCard.bind(this), this.clickDeleteCat.bind(this));
            });
        } catch (error) {
            console.error('Ошибка при отрисовке главной страницы:', error);
            this.parent.innerHTML = '<div class="alert alert-danger m-3">Ошибка загрузки страницы. Попробуйте обновить страницу.</div>';
        }
    }
}
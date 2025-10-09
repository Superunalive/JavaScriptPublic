// pages/cat/index.js

import { CatDetailComponent } from "../../components/cat-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { NotificationComponent } from "../../components/notification/index.js";
import { UtilsPanelComponent } from "../../components/utils-panel/index.js";
import { MainPage } from "../main/index.js";
import { getCatById } from "../../data/catsData.js";

export class CatPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.notification = new NotificationComponent();
    }

    get pageRoot() {
        return document.getElementById('cat-page');
    }

    getHTML() {
        return `
            <div id="cat-page"></div>
        `;
    }

    clickBack() {
        try {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        } catch (error) {
            console.error('Ошибка при возврате на главную:', error);
            this.notification.show('Не удалось вернуться на главную страницу', 'danger');
        }
    }

    render() {
    try {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = getCatById(this.id);
        if (data) {
            const catDetail = new CatDetailComponent(this.pageRoot);
            catDetail.render(data);
            
            // НОВОЕ: Панель с функциями анализа
            const utilsPanel = new UtilsPanelComponent(this.pageRoot);
            utilsPanel.render(data);
        } else {
            this.pageRoot.innerHTML += '<div class="alert alert-warning m-3">Кошка не найдена</div>';
        }
    } catch (error) {
        console.error('Ошибка при отрисовке страницы кошки:', error);
        this.parent.innerHTML = '<div class="alert alert-danger m-3">Ошибка загрузки информации о кошке. Попробуйте вернуться назад.</div>';
    }
}
}
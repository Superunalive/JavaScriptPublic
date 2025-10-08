import { CatDetailComponent } from "../../components/cat-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { getCatById } from "../../data/catsData.js";

export class CatPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
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
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = getCatById(this.id);
        if (data) {
            const catDetail = new CatDetailComponent(this.pageRoot);
            catDetail.render(data);
        } else {
            this.pageRoot.innerHTML += '<div class="alert alert-warning">Кошка не найдена</div>';
        }
    }
}
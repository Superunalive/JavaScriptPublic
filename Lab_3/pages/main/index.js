import { CatCardComponent } from "../../components/cat-card/index.js";
import { CatPage } from "../cat/index.js";
import { getAllCats, addCat, deleteCat } from "../../data/catsData.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get toolbarRoot() {
        return document.getElementById('toolbar');
    }

    getHTML() {
        return `
            <div id="toolbar" class="toolbar">
                <h5>Управление приютом</h5>
                <button class="btn btn-success" id="add-cat-btn">➕ Добавить кошку</button>
            </div>
            <div id="main-page" class="row"></div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        
        const catPage = new CatPage(this.parent, cardId);
        catPage.render();
    }

    clickAddCat() {
        addCat();
        this.render();
    }

    clickDeleteCat(e) {
        const catId = e.target.dataset.id;
        if (confirm('Вы уверены, что хотите удалить эту кошку?')) {
            deleteCat(catId);
            this.render();
        }
    }

    addListeners() {
        document.getElementById('add-cat-btn').addEventListener('click', () => {
            this.clickAddCat();
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.addListeners();

        const data = getAllCats();
        data.forEach((item) => {
            const catCard = new CatCardComponent(this.pageRoot);
            catCard.render(item, this.clickCard.bind(this), this.clickDeleteCat.bind(this));
        });
    }
}
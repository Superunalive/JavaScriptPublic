import { CatDetailComponent } from "../../components/cat-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { UtilsPanelComponent } from "../../components/utils-panel/index.js";
import { MainPage } from "../main/index.js";

export class CatPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const allCats = [
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

        return allCats.find(cat => cat.id === parseInt(this.id));
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

        const data = this.getData();
        if (data) {
            const catDetail = new CatDetailComponent(this.pageRoot);
            catDetail.render(data);
            
            // НОВОЕ: Панель с утилитами
            const utilsPanel = new UtilsPanelComponent(this.pageRoot);
            utilsPanel.render(data, this.getAllCats());
        }
    }

     getAllCats() {
        // Возвращаем все данные кошек для сравнения
        return this.allCats;
    }
}
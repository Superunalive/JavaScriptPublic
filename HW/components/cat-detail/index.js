import { AlertComponent } from "../alert/index.js";

export class CatDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-4">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="${data.name}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h2 class="card-title">🐱 ${data.name}</h2>
                            
                            <div id="status-alert-${data.id}" class="mb-3"></div>
                            
                            <div class="mb-3">
                                <h5>📋 Основная информация</h5>
                                <p><strong>Возраст:</strong> ${data.age}</p>
                                <p><strong>Окрас:</strong> ${data.color}</p>
                                <p><strong>Вес:</strong> ${data.weight}</p>
                            </div>
                            
                            <div class="mb-3">
                                <h5>🎭 Характер</h5>
                                <div id="character-alert-${data.id}"></div>
                            </div>
                            
                            <div class="mb-3">
                                <h5>💚 Здоровье</h5>
                                <div id="health-alert-${data.id}"></div>
                            </div>
                            
                            <div class="mb-3">
                                <h5>📖 История</h5>
                                <p class="text-muted">${data.story}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const statusAlert = new AlertComponent(document.getElementById(`status-alert-${data.id}`));
        let statusType = 'info';
        let statusText = data.statusText;
        
        if (data.status === 'available') {
            statusType = 'success';
            statusText = '<strong>✅ Отличная новость!</strong> ' + data.statusText + '. Вы можете забрать этого питомца уже сегодня!';
        } else if (data.status === 'adopted') {
            statusType = 'secondary';
            statusText = '<strong>🏠 Кошка нашла дом!</strong> ' + data.statusText + ', но вы можете посмотреть других наших питомцев.';
        } else if (data.status === 'medical') {
            statusType = 'warning';
            statusText = '<strong>⚕️ На лечении.</strong> ' + data.statusText + '. Свяжитесь с нами для подробной информации.';
        }
        
        statusAlert.render(statusType, statusText);
        
        const characterAlert = new AlertComponent(document.getElementById(`character-alert-${data.id}`));
        characterAlert.render('info', data.character);
        
        const healthAlert = new AlertComponent(document.getElementById(`health-alert-${data.id}`));
        const healthType = data.status === 'medical' ? 'warning' : 'success';
        healthAlert.render(healthType, data.health);
    }
}
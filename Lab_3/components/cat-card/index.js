// components/cat-card/index.js

import { AlertComponent } from "../alert/index.js";

export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img 
                        src="${data.src}" 
                        class="card-img-top" 
                        alt="${data.name}"
                        onerror="this.src='images/placeholder.jpeg'"
                    >
                    <div class="card-body">
                        <h5 class="card-title">🐱 ${data.name}</h5>
                        <p class="card-text"><strong>Возраст:</strong> ${data.age}</p>
                        <p class="card-text">${data.description}</p>
                        <div id="alert-${data.id}"></div>
                        <div class="cat-actions">
                            <button class="btn btn-primary" id="view-cat-${data.id}" data-id="${data.id}">
                                Подробнее
                            </button>
                            <button class="btn btn-danger" id="delete-cat-${data.id}" data-id="${data.id}">
                                🗑️ Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, viewListener, deleteListener) {
        document
            .getElementById(`view-cat-${data.id}`)
            .addEventListener("click", viewListener);
            
        document
            .getElementById(`delete-cat-${data.id}`)
            .addEventListener("click", deleteListener);
    }

    render(data, viewListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const alertParent = document.getElementById(`alert-${data.id}`);
        const alert = new AlertComponent(alertParent);
        
        let alertType = 'info';
        let alertText = data.statusText;
        
        if (data.status === 'available') {
            alertType = 'success';
            alertText = '✅ ' + data.statusText;
        } else if (data.status === 'adopted') {
            alertType = 'secondary';
            alertText = '🏠 ' + data.statusText;
        } else if (data.status === 'medical') {
            alertType = 'warning';
            alertText = '⚕️ ' + data.statusText;
        }
        
        alert.render(alertType, alertText);
        this.addListeners(data, viewListener, deleteListener);
    }
}
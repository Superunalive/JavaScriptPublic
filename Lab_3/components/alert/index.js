export class AlertComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(type, message, dismissible = false) {
        const dismissClass = dismissible ? 'alert-dismissible fade show' : '';
        const dismissButton = dismissible ? `
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        ` : '';
        
        return `
            <div class="alert alert-${type} ${dismissClass} mb-2" role="alert">
                ${message}
                ${dismissButton}
            </div>
        `;
    }

    render(type = 'info', message = '', dismissible = false) {
        const html = this.getHTML(type, message, dismissible);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
// emergency.js - Lógica específica para emergencias

class EmergencyAssistant {
    constructor() {
        this.emergencyTypes = {
            medical: {
                title: "Emergencia Médica",
                steps: [
                    "Evaluar el estado de la persona",
                    "Llamar a servicios de emergencia",
                    "Aplicar primeros auxilios según el caso",
                    "Mantener a la persona calma y segura"
                ],
                contacts: ["911", "Ambulancia local", "Hospital más cercano"]
            },
            police: {
                title: "Emergencia de Seguridad",
                steps: [
                    "Alejarse del peligro si es posible",
                    "Llamar a la policía inmediatamente",
                    "Buscar un lugar seguro",
                    "Proporcionar detalles claros a las autoridades"
                ],
                contacts: ["911", "Policía local", "Seguridad vecinal"]
            },
            fire: {
                title: "Emergencia por Incendio",
                steps: [
                    "Alertar a todos en el área",
                    "Usar extintor si es seguro",
                    "Evacuar el área inmediatamente",
                    "No usar ascensores"
                ],
                contacts: ["911", "Bomberos", "Protección civil"]
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEmergencyButtons();
        this.setupAssistant();
    }
    
    bindEmergencyButtons() {
        document.querySelectorAll('.emergency-option').forEach(button => {
            button.addEventListener('click', e => {
                const type = e.currentTarget.classList.contains('medical') ? 'medical' : 
                            e.currentTarget.classList.contains('police') ? 'police' : 'fire';
                this.showEmergencyProtocol(type);
            });
        });
    }
    
    showEmergencyProtocol(type) {
        const protocol = this.emergencyTypes[type];
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="emergency-protocol">
                <h4>${protocol.title}</h4>
                <ol class="protocol-steps">
                    ${protocol.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
                <div class="emergency-contacts">
                    <h5>Contactos de Emergencia</h5>
                    <div class="contact-buttons">
                        ${protocol.contacts.map(contact => `
                            <button class="contact-btn">
                                <i class="fas fa-phone"></i> ${contact}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="emergency-timer">
                    <div class="timer-circle">
                        <
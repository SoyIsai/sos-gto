// map.js - Integración de mapas para emergencias

class EmergencyMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.map = null;
        this.markers = [];
        
        if (this.container) {
            this.initMap();
        }
    }
    
    initMap() {
        // Simulación de mapa (en producción usar API como Google Maps o Mapbox)
        this.container.innerHTML = `
            <div class="simulated-map">
                <div class="map-overlay"></div>
                <div class="user-marker"></div>
                <div class="emergency-marker" style="top: 30%; left: 25%;"></div>
                <div class="emergency-marker" style="top: 60%; left: 70%;"></div>
                <div class="safe-marker" style="top: 45%; left: 50%;"></div>
            </div>
        `;
        
        // En una implementación real:
        // this.map = L.map(containerId).setView([51.505, -0.09], 13);
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }
    
    addMarker(lat, lng, type, title) {
        // Simulación de marcador
        const marker = document.createElement('div');
        marker.className = `simulated-marker ${type}`;
        marker.style.top = `${lat}%`;
        marker.style.left = `${lng}%`;
        marker.title = title;
        
        this.container.querySelector('.simulated-map').appendChild(marker);
        this.markers.push(marker);
        
        // En una implementación real:
        // const icon = L.divIcon({className: `map-marker ${type}`});
        // const marker = L.marker([lat, lng], {icon}).addTo(this.map).bindPopup(title);
        // this.markers.push(marker);
    }
    
    locateUser() {
        // Simulación de geolocalización
        const loading = document.createElement('div');
        loading.className = 'map-loading';
        loading.textContent = 'Detectando ubicación...';
        this.container.appendChild(loading);
        
        setTimeout(() => {
            loading.remove();
            this.addMarker(50, 50, 'user', 'Tu ubicación');
            
            // Mostrar alerta si hay riesgos cercanos
            this.checkNearbyRisks();
        }, 1500);
        
        // En una implementación real:
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //         position => this.handleLocationSuccess(position),
        //         error => this.handleLocationError(error)
        //     );
        // }
    }
    
    checkNearbyRisks() {
        const riskAlert = document.createElement('div');
        riskAlert.className = 'map-risk-alert';
        riskAlert.innerHTML = `
            <div class="alert-icon">⚠️</div>
            <div class="alert-content">
                <h4>Zona de riesgo cercana</h4>
                <p>Incendio reportado a 2km de tu ubicación</p>
            </div>
        `;
        
        this.container.appendChild(riskAlert);
        
        setTimeout(() => {
            riskAlert.classList.add('show');
        }, 100);
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const emergencyMap = new EmergencyMap('riskMap');
    
    // Botón de ubicación
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            emergencyMap.locateUser();
            this.classList.add('active');
        });
    }
    
    // Cargar datos de mapa según la ubicación
    if (window.location.pathname.includes('naturales.html')) {
        // Simular datos de riesgos naturales
        setTimeout(() => {
            emergencyMap.addMarker(30, 25, 'emergency', 'Zona sísmica');
            emergencyMap.addMarker(60, 70, 'emergency', 'Área de inundación');
            emergencyMap.addMarker(45, 50, 'safe', 'Refugio seguro');
        }, 1000);
    }
});

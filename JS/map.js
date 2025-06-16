// map.js - Versión completa con todas las funciones

class EmergencyMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.map = null;
        this.userLocation = null;
        this.riskLayers = [];
        this.facilities = [];
        
        this.initMap();
    }
    
    initMap() {
        // Configuración inicial del mapa
        this.map = L.map(this.container, {
            zoomControl: false,
            fadeAnimation: true,
            zoomAnimation: true
        }).setView([19.4326, -99.1332], 12); // Centro en CDMX
        
        // Capa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18,
            detectRetina: true
        }).addTo(this.map);
        
        // Añadir controles personalizados
        this.addMapControls();
        
        // Estilo para el contenedor
        this.container.style.border = '1px solid #eee';
        this.container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
    
    addMapControls() {
        // Control de zoom personalizado
        L.control.zoom({
            position: 'topright',
            zoomInText: '+',
            zoomOutText: '-'
        }).addTo(this.map);
        
        // Control de escala
        L.control.scale({
            position: 'bottomleft',
            imperial: false,
            maxWidth: 200
        }).addTo(this.map);
    }
    
    addRiskZone(coordinates, riskLevel, title, description = '') {
        const zoneColors = {
            high: '#e63946',
            medium: '#f4a261',
            low: '#2a9d8f'
        };
        
        const zone = L.polygon(coordinates, {
            color: zoneColors[riskLevel],
            fillColor: zoneColors[riskLevel],
            fillOpacity: 0.15,
            weight: 2,
            dashArray: riskLevel === 'high' ? '5, 5' : null
        }).addTo(this.map);
        
        zone.bindPopup(`
            <h3>${title}</h3>
            <p><strong>Nivel:</strong> ${this.getRiskLevelName(riskLevel)}</p>
            ${description ? `<p>${description}</p>` : ''}
        `);
        
        this.riskLayers.push(zone);
        return zone;
    }
    
    getRiskLevelName(level) {
        const names = {
            high: 'Alto riesgo',
            medium: 'Riesgo medio',
            low: 'Riesgo bajo'
        };
        return names[level] || level;
    }
    
    addEmergencyFacility(lat, lng, type, name, description = '') {
        const icons = {
            hospital: '🏥',
            police: '🚓',
            fire: '🚒',
            shelter: '🏠'
        };
        
        const facility = L.marker([lat, lng], {
            icon: L.divIcon({
                html: `<div class="facility-marker">${icons[type]}</div>`,
                className: `facility-${type}`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            }),
            zIndexOffset: 1000
        }).addTo(this.map);
        
        facility.bindPopup(`
            <h3>${name}</h3>
            <p><strong>Tipo:</strong> ${this.getFacilityTypeName(type)}</p>
            ${description ? `<p>${description}</p>` : ''}
        `);
        
        this.facilities.push(facility);
        return facility;
    }
    
    getFacilityTypeName(type) {
        const names = {
            hospital: 'Hospital',
            police: 'Policía',
            fire: 'Bomberos',
            shelter: 'Refugio'
        };
        return names[type] || type;
    }
    
    async locateUser() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }
            
            // Mostrar spinner en el botón
            const btn = document.getElementById('locationBtn');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="spinner"></span>';
            btn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    this.userLocation = { lat: latitude, lng: longitude };
                    
                    // Centrar mapa en la ubicación
                    this.map.setView([latitude, longitude], 15);
                    
                    // Añadir marcador de usuario
                    this.addUserMarker(latitude, longitude);
                    
                    // Restaurar botón
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.classList.add('active');
                    
                    resolve(this.userLocation);
                },
                error => {
                    console.error('Error de geolocalización:', error);
                    
                    // Mostrar error
                    this.showError('No se pudo obtener tu ubicación');
                    
                    // Restaurar botón
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
    
    addUserMarker(lat, lng) {
        // Eliminar marcador anterior si existe
        if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
        }
        
        this.userMarker = L.marker([lat, lng], {
            icon: L.divIcon({
                html: '<div class="user-marker"></div>',
                className: 'user-location',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            }),
            zIndexOffset: 2000
        }).addTo(this.map);
        
        this.userMarker.bindPopup('<strong>Tu ubicación</strong>').openPopup();
    }
    
    showError(message) {
        const errorControl = L.control({ position: 'topright' });
        
        errorControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'map-error');
            div.innerHTML = message;
            return div;
        };
        
        errorControl.addTo(this.map);
        
        setTimeout(() => {
            this.map.removeControl(errorControl);
        }, 5000);
    }
    
    clearAll() {
        this.riskLayers.forEach(layer => this.map.removeLayer(layer));
        this.facilities.forEach(facility => this.map.removeLayer(facility));
        if (this.userMarker) this.map.removeLayer(this.userMarker);
        
        this.riskLayers = [];
        this.facilities = [];
        this.userMarker = null;
    }
}

// Inicialización y configuración de datos
document.addEventListener('DOMContentLoaded', () => {
    const map = new EmergencyMap('riskMap');
    
    // Configurar botones
    document.getElementById('locationBtn')?.addEventListener('click', () => {
        map.locateUser().then(location => {
            // Cargar datos relevantes para la ubicación
            loadLocationData(map, location);
        });
    });
    
    document.getElementById('refreshMap')?.addEventListener('click', () => {
        refreshMapData(map);
    });
    
    // Carga inicial de datos para desastres naturales
    if (window.location.pathname.includes('naturales.html')) {
        loadNaturalDisastersData(map);
    }
});

// Función para cargar datos de desastres naturales
function loadNaturalDisastersData(map) {
    // Datos de ejemplo - en una app real estos vendrían de una API
    const earthquakeZone = [
        [19.43, -99.14],
        [19.44, -99.13],
        [19.42, -99.12],
        [19.41, -99.15]
    ];
    
    const floodZone = [
        [19.41, -99.16],
        [19.40, -99.15],
        [19.39, -99.17],
        [19.42, -99.18]
    ];
    
    // Añadir zonas de riesgo
    map.addRiskZone(
        earthquakeZone,
        'high',
        'Zona Sísmica',
        'Área con actividad sísmica frecuente. Último sismo: 3.5° hace 2 días'
    );
    
    map.addRiskZone(
        floodZone,
        'medium',
        'Área de Inundación',
        'Zona con historial de inundaciones en temporada de lluvias'
    );
    
    // Añadir instalaciones de emergencia
    map.addEmergencyFacility(
        19.4319, -99.1328,
        'hospital',
        'Hospital General',
        'Servicio de emergencias 24/7'
    );
    
    map.addEmergencyFacility(
        19.4335, -99.1402,
        'shelter',
        'Refugio Temporal Centro',
        'Capacidad: 300 personas'
    );
    
    // Ajustar vista para mostrar todo
    const bounds = L.latLngBounds([
        ...earthquakeZone,
        ...floodZone,
        [19.4319, -99.1328],
        [19.4335, -99.1402]
    ]);
    
    map.map.fitBounds(bounds.pad(0.1));
}

// Función para refrescar datos
function refreshMapData(map) {
    const btn = document.getElementById('refreshMap');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span class="spinner"></span> Actualizando...';
    btn.disabled = true;
    
    // Simular carga de datos
    setTimeout(() => {
        map.clearAll();
        loadNaturalDisastersData(map);
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
                           }

// map.js - Integración con OpenStreetMap usando Leaflet

class EmergencyMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.map = null;
        this.markers = [];
        this.userLocation = null;
        
        if (this.container) {
            this.initMap();
        }
    }
    
    initMap() {
        // Crear mapa con vista inicial genérica
        this.map = L.map(this.container).setView([19.4326, -99.1332], 12); // Centro en CDMX
        
        // Capa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        
        // Añadir control de escala
        L.control.scale().addTo(this.map);
        
        // Estilos para el contenedor del mapa
        this.container.style.borderRadius = 'var(--border-radius-sm)';
        this.container.style.overflow = 'hidden';
        this.container.style.height = '300px';
        this.container.style.marginBottom = '1rem';
    }
    
    addMarker(lat, lng, type, title, popupContent = '') {
        // Iconos personalizados
        const iconColors = {
            emergency: '#e63946',
            safe: '#2a9d8f',
            medical: '#457b9d',
            user: '#1d3557'
        };
        
        const icon = L.divIcon({
            className: `map-marker ${type}`,
            html: `<svg viewBox="0 0 24 24" fill="${iconColors[type]}" width="24" height="24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
        
        const marker = L.marker([lat, lng], { icon })
            .addTo(this.map)
            .bindPopup(`<strong>${title}</strong><br>${popupContent}`);
        
        this.markers.push(marker);
        return marker;
    }
    
    locateUser() {
        return new Promise((resolve, reject) => {
            // Mostrar estado de carga
            const loadingControl = L.control({
                position: 'topright'
            });
            
            loadingControl.onAdd = function() {
                const div = L.DomUtil.create('div', 'map-loading');
                div.innerHTML = '<div class="spinner"></div><p>Detectando ubicación...</p>';
                return div;
            };
            
            loadingControl.addTo(this.map);
            
            // Obtener geolocalización
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        this.userLocation = { lat: latitude, lng: longitude };
                        
                        // Centrar mapa en la ubicación del usuario
                        this.map.setView([latitude, longitude], 15);
                        
                        // Añadir marcador de usuario
                        this.addMarker(
                            latitude, 
                            longitude, 
                            'user', 
                            'Tu ubicación',
                            'Estás aquí'
                        );
                        
                        // Quitar control de carga
                        this.map.removeControl(loadingControl);
                        
                        resolve(this.userLocation);
                    },
                    error => {
                        console.error('Error getting location:', error);
                        this.map.removeControl(loadingControl);
                        
                        // Añadir control de error
                        const errorControl = L.control({
                            position: 'topright'
                        });
                        
                        errorControl.onAdd = function() {
                            const div = L.DomUtil.create('div', 'map-error');
                            div.innerHTML = 'No se pudo obtener la ubicación';
                            return div;
                        };
                        
                        errorControl.addTo(this.map);
                        setTimeout(() => {
                            this.map.removeControl(errorControl);
                        }, 3000);
                        
                        reject(error);
                    },
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            } else {
                this.map.removeControl(loadingControl);
                reject(new Error('Geolocation not supported'));
            }
        });
    }
    
    addRiskZone(points, type, title) {
        const zoneColors = {
            high: '#e63946',
            medium: '#e9c46a',
            low: '#2a9d8f'
        };
        
        const polygon = L.polygon(points, {
            color: zoneColors[type],
            fillColor: zoneColors[type],
            fillOpacity: 0.2,
            weight: 2
        }).addTo(this.map);
        
        polygon.bindPopup(`<strong>${title}</strong><br>Zona de ${type} riesgo`);
        this.markers.push(polygon);
        return polygon;
    }
    
    addEmergencyFacility(lat, lng, facilityType, title) {
        const facilityIcons = {
            hospital: '🏥',
            police: '🚓',
            fire: '🚒',
            shelter: '🏠'
        };
        
        const marker = L.marker([lat, lng], {
            icon: L.divIcon({
                className: 'facility-marker',
                html: `<div class="facility-icon">${facilityIcons[facilityType]}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            })
        }).addTo(this.map);
        
        marker.bindPopup(`<strong>${title}</strong><br>${facilityType}`);
        this.markers.push(marker);
        return marker;
    }
    
    clearMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
    }
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function() {
    const emergencyMap = new EmergencyMap('riskMap');
    
    // Datos de ejemplo para zonas de riesgo (coordenadas pueden ser reales)
    const riskZones = {
        earthquake: {
            points: [
                [19.43, -99.14],
                [19.44, -99.13],
                [19.42, -99.12],
                [19.41, -99.15]
            ],
            type: 'high',
            title: 'Zona Sísmica'
        },
        flood: {
            points: [
                [19.41, -99.16],
                [19.40, -99.15],
                [19.39, -99.17],
                [19.42, -99.18]
            ],
            type: 'medium',
            title: 'Área de Inundación'
        }
    };
    
    // Datos de ejemplo para instalaciones de emergencia
    const emergencyFacilities = [
        { lat: 19.4319, lng: -99.1328, type: 'hospital', title: 'Hospital General' },
        { lat: 19.4335, lng: -99.1402, type: 'police', title: 'Estación de Policía' },
        { lat: 19.4298, lng: -99.1256, type: 'shelter', title: 'Refugio Temporal' }
    ];
    
    // Botón de ubicación
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) {
        locationBtn.addEventListener('click', async function() {
            try {
                this.innerHTML = '<div class="spinner-small"></div>';
                
                await emergencyMap.locateUser();
                
                // Añadir zonas de riesgo después de ubicar al usuario
                emergencyMap.addRiskZone(
                    riskZones.earthquake.points,
                    riskZones.earthquake.type,
                    riskZones.earthquake.title
                );
                
                emergencyMap.addRiskZone(
                    riskZones.flood.points,
                    riskZones.flood.type,
                    riskZones.flood.title
                );
                
                // Añadir instalaciones de emergencia
                emergencyFacilities.forEach(facility => {
                    emergencyMap.addEmergencyFacility(
                        facility.lat,
                        facility.lng,
                        facility.type,
                        facility.title
                    );
                });
                
                this.innerHTML = 'Ubicación detectada';
                this.classList.add('active');
                
                // Mostrar leyenda
                const legend = L.control({ position: 'bottomright' });
                
                legend.onAdd = function() {
                    const div = L.DomUtil.create('div', 'map-legend');
                    div.innerHTML = `
                        <h4>Leyenda</h4>
                        <div><span class="legend-icon emergency"></span> Zona de riesgo</div>
                        <div><span class="legend-icon hospital">🏥</span> Hospital</div>
                        <div><span class="legend-icon police">🚓</span> Policía</div>
                        <div><span class="legend-icon shelter">🏠</span> Refugio</div>
                        <div><span class="legend-icon user"></span> Tu ubicación</div>
                    `;
                    return div;
                };
                
                legend.addTo(emergencyMap.map);
                
            } catch (error) {
                console.error('Error:', error);
                this.innerHTML = 'Error al ubicar';
                setTimeout(() => {
                    this.innerHTML = 'Detectar ubicación';
                }, 2000);
            }
        });
    }
    
    // Cargar datos iniciales para la página de naturales
    if (window.location.pathname.includes('naturales.html')) {
        // Simular carga de datos después de un breve retraso
        setTimeout(() => {
            emergencyMap.addRiskZone(
                riskZones.earthquake.points,
                riskZones.earthquake.type,
                riskZones.earthquake.title
            );
            
            emergencyMap.addRiskZone(
                riskZones.flood.points,
                riskZones.flood.type,
                riskZones.flood.title
            );
            
            emergencyFacilities.forEach(facility => {
                emergencyMap.addEmergencyFacility(
                    facility.lat,
                    facility.lng,
                    facility.type,
                    facility.title
                );
            });
            
            // Ajustar vista para mostrar todos los elementos
            const featureGroup = L.featureGroup(
                emergencyMap.markers
            ).addTo(emergencyMap.map);
            
            emergencyMap.map.fitBounds(featureGroup.getBounds().pad(0.2));
        }, 1000);
    }
});

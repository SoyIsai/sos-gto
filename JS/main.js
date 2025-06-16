// Función para inicializar mapas en todas las páginas
function initMaps() {
    // Verificar si estamos en una página con mapa
    if (document.getElementById('riskMap')) {
        const map = new EmergencyMap('riskMap');
        
        // Botón de actualización
        const refreshBtn = document.getElementById('refreshMap');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                refreshBtn.innerHTML = '<div class="spinner-small"></div> Actualizando...';
                
                // Simular actualización
                setTimeout(() => {
                    refreshBtn.innerHTML = 'Mapa actualizado';
                    setTimeout(() => {
                        refreshBtn.innerHTML = 'Actualizar mapa';
                    }, 2000);
                }, 1500);
            });
        }
        
        // Cargar datos iniciales según la página
        if (window.location.pathname.includes('naturales.html')) {
            loadNaturalDisastersMap(map);
        } else if (window.location.pathname.includes('salud.html')) {
            loadHealthEmergenciesMap(map);
        } else if (window.location.pathname.includes('accidentes.html')) {
            loadAccidentsMap(map);
        }
    }
}

// Ejemplo de carga para desastres naturales
function loadNaturalDisastersMap(map) {
    // Datos simulados (en producción vendrían de una API)
    setTimeout(() => {
        // Zona sísmica
        map.addRiskZone(
            [
                [19.43, -99.14],
                [19.44, -99.13],
                [19.42, -99.12],
                [19.41, -99.15]
            ],
            'high',
            'Zona Sísmica Activa',
            'Área con alta actividad sísmica en los últimos 3 meses'
        );
        
        // Zona de inundación
        map.addRiskZone(
            [
                [19.41, -99.16],
                [19.40, -99.15],
                [19.39, -99.17],
                [19.42, -99.18]
            ],
            'medium',
            'Área de Inundación',
            'Zona con historial de inundaciones en temporada de lluvias'
        );
        
        // Refugios
        map.addEmergencyFacility(
            19.4319, -99.1328,
            'shelter',
            'Refugio Temporal Centro',
            'Capacidad: 200 personas\nAbierto 24/7'
        );
        
        // Ajustar vista para mostrar todo
        const bounds = L.latLngBounds(
            map.markers.map(marker => marker.getLatLng())
        );
        map.map.fitBounds(bounds.pad(0.2));
    }, 800);
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    initMaps();
    
    // Otros inicializadores...
});

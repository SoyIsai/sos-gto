// Datos de ejemplo (en producción usar API real)
const peligros = [
    { lat: 19.4326, lng: -99.1332, tipo: "Incendio", desc: "Incendio reportado en edificio" },
    { lat: 19.4350, lng: -99.1400, tipo: "Inundación", desc: "Calle anegada" }
];

const hospitales = [
    { lat: 19.4289, lng: -99.1276, nombre: "Hospital General", telefono: "555-1234" },
    { lat: 19.4421, lng: -99.0978, nombre: "Centro Médico", telefono: "555-5678" }
];

const refugios = [
    { lat: 19.4350, lng: -99.1400, nombre: "Albergue Benito Juárez", capacidad: "300 personas" },
    { lat: 19.4260, lng: -99.1500, nombre: "Escuela Primaria", capacidad: "150 personas" }
];

document.addEventListener('DOMContentLoaded', function() {
    const mapa = L.map('mapa').setView([19.4326, -99.1332], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    // Capas
    const capaPeligros = L.layerGroup();
    const capaHospitales = L.layerGroup();
    const capaRefugios = L.layerGroup();

    // Iconos personalizados
    const iconoPeligro = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41]
    });
    
    const iconoHospital = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41]
    });
    
    const iconoRefugio = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [25, 41]
    });

    // Añadir marcadores
    peligros.forEach(p => {
        L.marker([p.lat, p.lng], { icon: iconoPeligro })
            .addTo(capaPeligros)
            .bindPopup(`<b>${p.tipo}</b><br>${p.desc}`);
    });

    hospitales.forEach(h => {
        L.marker([h.lat, h.lng], { icon: iconoHospital })
            .addTo(capaHospitales)
            .bindPopup(`<b>${h.nombre}</b><br>Tel: ${h.telefono}`);
    });

    refugios.forEach(r => {
        L.marker([r.lat, r.lng], { icon: iconoRefugio })
            .addTo(capaRefugios)
            .bindPopup(`<b>${r.nombre}</b><br>Capacidad: ${r.capacidad}`);
    });

    // Mostrar capa de peligros por defecto
    capaPeligros.addTo(mapa);

    // Control de filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const capa = this.dataset.capa;
            capaPeligros.removeFrom(mapa);
            capaHospitales.removeFrom(mapa);
            capaRefugios.removeFrom(mapa);
            
            if(capa === 'peligros') capaPeligros.addTo(mapa);
            if(capa === 'hospitales') capaHospitales.addTo(mapa);
            if(capa === 'refugios') capaRefugios.addTo(mapa);
        });
    });

    // Geolocalización
    document.getElementById('miUbicacion').addEventListener('click', function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                mapa.setView([pos.coords.latitude, pos.coords.longitude], 15);
                L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(mapa)
                    .bindPopup("<b>Tu ubicación</b>")
                    .openPopup();
            });
        } else {
            alert("La geolocalización no está disponible en tu navegador");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const kits = {
        terremoto: [
            "Agua (4 litros por persona)",
            "Alimentos no perecederos (3 días)",
            "Linterna con pilas extra",
            "Radio portátil",
            "Botiquín de primeros auxilios",
            "Documentos importantes en bolsa hermética"
        ],
        incendio: [
            "Mascarilla anti-humo",
            "Linterna resistente al calor",
            "Cuerda de evacuación",
            "Extintor pequeño",
            "Manta ignífuga"
        ],
        medico: [
            "Medicamentos recetados (7 días)",
            "Termómetro digital",
            "Tijeras de trauma",
            "Guantes estériles",
            "Lista de contactos médicos"
        ]
    };

    const tipoEmergencia = document.getElementById('tipoEmergencia');
    const listaItems = document.getElementById('listaItems');
    const progreso = document.getElementById('progresoKit');
    const porcentaje = document.getElementById('porcentaje');

    tipoEmergencia.addEventListener('change', function() {
        generarLista(this.value);
    });

    function generarLista(tipo) {
        listaItems.innerHTML = '';
        let html = '';
        
        kits[tipo].forEach(item => {
            html += `
            <div class="item-kit">
                <input type="checkbox" id="${item.replace(/\s+/g, '-')}">
                <label for="${item.replace(/\s+/g, '-')}">${item}</label>
            </div>
            `;
        });

        listaItems.innerHTML = html;
        actualizarProgreso();
        
        // Agregar event listeners a los nuevos checkboxes
        document.querySelectorAll('.item-kit input').forEach(checkbox => {
            checkbox.addEventListener('change', actualizarProgreso);
        });
    }

    function actualizarProgreso() {
        const total = document.querySelectorAll('.item-kit').length;
        const completados = document.querySelectorAll('.item-kit input:checked').length;
        const porcentajeCompletado = total > 0 ? Math.round((completados / total) * 100) : 0;
        
        progreso.value = porcentajeCompletado;
        porcentaje.textContent = `${porcentajeCompletado}% completado`;
        
        // Cambiar color según progreso
        if(porcentajeCompletado < 30) {
            progreso.className = 'bajo';
        } else if(porcentajeCompletado < 70) {
            progreso.className = 'medio';
        } else {
            progreso.className = 'alto';
        }
    }

    // Inicializar con terremoto por defecto
    generarLista('terremoto');
});

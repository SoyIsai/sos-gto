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
// Añadir al final del archivo existente

// Función para compartir kit
document.getElementById('btnCompartir').addEventListener('click', function() {
    const tipo = tipoEmergencia.value;
    const completados = document.querySelectorAll('.item-kit input:checked').length;
    const total = kits[tipo].length;
    
    const texto = `✅ Mi Kit de Emergencia para ${tipo} está ${Math.round((completados/total)*100)}% completo:\n` +
                 kits[tipo].map(item => `${document.getElementById(item.replace(/\s+/g, '-')).checked ? '✓' : '◻'} ${item}`).join('\n');
    
    if(navigator.share) {
        navigator.share({
            title: `Kit de Emergencia - ${tipo}`,
            text: texto,
            url: window.location.href
        }).catch(err => {
            console.log('Error al compartir:', err);
            copiarAlPortapapeles(texto);
        });
    } else {
        copiarAlPortapapeles(texto);
    }
});

function copiarAlPortapapeles(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Lista copiada al portapapeles. Puedes pegarla donde la necesites.');
}
// Añadir al final del archivo existente

// Función para compartir kit
document.getElementById('btnCompartir').addEventListener('click', function() {
    const tipo = tipoEmergencia.value;
    const completados = document.querySelectorAll('.item-kit input:checked').length;
    const total = kits[tipo].length;
    
    const texto = `✅ Mi Kit de Emergencia para ${tipo} está ${Math.round((completados/total)*100)}% completo:\n` +
                 kits[tipo].map(item => `${document.getElementById(item.replace(/\s+/g, '-')).checked ? '✓' : '◻'} ${item}`).join('\n');
    
    if(navigator.share) {
        navigator.share({
            title: `Kit de Emergencia - ${tipo}`,
            text: texto,
            url: window.location.href
        }).catch(err => {
            console.log('Error al compartir:', err);
            copiarAlPortapapeles(texto);
        });
    } else {
        copiarAlPortapapeles(texto);
    }
});

function copiarAlPortapapeles(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Lista copiada al portapapeles. Puedes pegarla donde la necesites.');
}

// Función para imprimir
document.getElementById('btnImprimir').addEventListener('click', function() {
    const ventana = window.open('', '_blank');
    const tipo = tipoEmergencia.value;
    const html = `
        <html>
            <head>
                <title>Kit de Emergencia - ${tipo}</title>
                <style>
                    body { font-family: Arial; padding: 20px; }
                    h1 { color: #2F4858; }
                    ul { margin-top: 20px; }
                    li { margin-bottom: 10px; }
                    .completado { color: green; }
                </style>
            </head>
            <body>
                <h1>Kit de Emergencia - ${tipo}</h1>
                <p>Generado el ${new Date().toLocaleDateString()}</p>
                <ul>
                    ${kits[tipo].map(item => 
                        `<li class="${document.getElementById(item.replace(/\s+/g, '-')).checked ? 'completado' : ''}">
                            ${item}
                        </li>`
                    ).join('')}
                </ul>
                <p>Estado: ${document.getElementById('porcentaje').textContent}</p>
            </body>
        </html>
    `;
    ventana.document.write(html);
    ventana.document.close();
    ventana.print();
});
// Función para imprimir
document.getElementById('btnImprimir').addEventListener('click', function() {
    const ventana = window.open('', '_blank');
    const tipo = tipoEmergencia.value;
    const html = `
        <html>
            <head>
                <title>Kit de Emergencia - ${tipo}</title>
                <style>
                    body { font-family: Arial; padding: 20px; }
                    h1 { color: #2F4858; }
                    ul { margin-top: 20px; }
                    li { margin-bottom: 10px; }
                    .completado { color: green; }
                </style>
            </head>
            <body>
                <h1>Kit de Emergencia - ${tipo}</h1>
                <p>Generado el ${new Date().toLocaleDateString()}</p>
                <ul>
                    ${kits[tipo].map(item => 
                        `<li class="${document.getElementById(item.replace(/\s+/g, '-')).checked ? 'completado' : ''}">
                            ${item}
                        </li>`
                    ).join('')}
                </ul>
                <p>Estado: ${document.getElementById('porcentaje').textContent}</p>
            </body>
        </html>
    `;
    ventana.document.write(html);
    ventana.document.close();
    ventana.print();
});
    // Inicializar con terremoto por defecto
    generarLista('terremoto');
});

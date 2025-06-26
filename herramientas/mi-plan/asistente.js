document.addEventListener('DOMContentLoaded', function() {
    const pasos = document.querySelectorAll('.paso');
    const btnAnterior = document.querySelector('.btn-anterior');
    const btnSiguiente = document.querySelector('.btn-siguiente');
    const btnAgregar = document.querySelector('.btn-agregar');
    const listaFamiliares = document.getElementById('listaFamiliares');
    let pasoActual = 1;
    
    // Familiares almacenados
    const familiares = [];
    
    // Navegación entre pasos
    btnSiguiente.addEventListener('click', function() {
        if(pasoActual < pasos.length) {
            document.querySelector(`.paso[data-paso="${pasoActual}"]`).classList.remove('active');
            pasoActual++;
            document.querySelector(`.paso[data-paso="${pasoActual}"]`).classList.add('active');
            actualizarBotones();
        }
    });
    
    btnAnterior.addEventListener('click', function() {
        if(pasoActual > 1) {
            document.querySelector(`.paso[data-paso="${pasoActual}"]`).classList.remove('active');
            pasoActual--;
            document.querySelector(`.paso[data-paso="${pasoActual}"]`).classList.add('active');
            actualizarBotones();
        }
    });
    
    function actualizarBotones() {
        btnAnterior.style.visibility = pasoActual === 1 ? 'hidden' : 'visible';
        btnSiguiente.textContent = pasoActual === pasos.length ? 'Finalizar' : 'Siguiente ➡';
    }
    
    // Agregar familiar
    btnAgregar.addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const parentesco = document.getElementById('parentesco').value;
        
        if(nombre && parentesco) {
            familiares.push({ nombre, parentesco });
            actualizarListaFamiliares();
            
            // Limpiar inputs
            document.getElementById('nombre').value = '';
            document.getElementById('parentesco').value = '';
        }
    });
    
    function actualizarListaFamiliares() {
        listaFamiliares.innerHTML = '';
        
        if(familiares.length === 0) {
            listaFamiliares.innerHTML = '<p class="vacio">No hay familiares agregados</p>';
            return;
        }
        
        familiares.forEach((familiar, index) => {
            const div = document.createElement('div');
            div.className = 'familiar-item';
            div.innerHTML = `
                <span>${familiar.nombre} (${familiar.parentesco})</span>
                <button class="btn-eliminar" data-index="${index}">🗑️</button>
            `;
            listaFamiliares.appendChild(div);
        });
        
        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                familiares.splice(index, 1);
                actualizarListaFamiliares();
            });
        });
    }
    
    // Inicializar
    actualizarBotones();
    actualizarListaFamiliares();
});

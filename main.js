// main.js - Funcionalidad principal

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.body.classList.remove('preload');
        document.querySelector('.loader').style.display = 'none';
    }, 1500);

    // Inicializar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#e74c3c" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#e74c3c", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Botón de emergencia
    const emergencyBtn = document.querySelector('.emergency-btn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (emergencyBtn && emergencyModal) {
        emergencyBtn.addEventListener('click', function() {
            emergencyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            emergencyModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Cerrar modal al hacer clic fuera
        emergencyModal.addEventListener('click', function(e) {
            if (e.target === emergencyModal) {
                emergencyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Animaciones al hacer scroll
    function checkScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Ejecutar al cargar

    // Efecto hover avanzado para tarjetas
    const cards = document.querySelectorAll('.info-card, .protocol-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.pageX - card.offsetLeft;
            const y = e.pageY - card.offsetTop;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Cambiar pestañas en secciones de emergencia
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.emergency-section');
            
            // Remover activo de todos los botones y contenidos
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activar el seleccionado
            this.classList.add('active');
            tabContainer.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });

    // Botón flotante de emergencia
    const floatingEmergencyBtn = document.querySelector('.emergency-btn-circle');
    if (floatingEmergencyBtn) {
        floatingEmergencyBtn.addEventListener('click', function() {
            emergencyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Efecto de ondas al hacer clic
    const waveElements = document.querySelectorAll('.wave-animation');
    waveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const wave = this.querySelector('.wave-effect') || document.createElement('span');
            wave.className = 'wave-effect';
            wave.style.left = `${x}px`;
            wave.style.top = `${y}px`;
            
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 1000);
        });
    });

    // Simular carga de mapa
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        setTimeout(() => {
            placeholder.innerHTML = '<div class="map-overlay"></div>';
        }, 2000);
    });
});

// Funciones de utilidad
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

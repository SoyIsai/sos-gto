// animations.js - Control de animaciones avanzadas

class SmoothScroll {
    constructor() {
        this.scrollToLinks = document.querySelectorAll('a[href^="#"]');
        this.events();
    }
    
    events() {
        this.scrollToLinks.forEach(link => {
            link.addEventListener('click', e => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (!target) return;
        
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.txtElement.textContent = this.txt;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

class CardTilt {
    constructor(card) {
        this.card = card;
        this.width = card.offsetWidth;
        this.height = card.offsetHeight;
        this.events();
    }
    
    events() {
        this.card.addEventListener('mousemove', e => this.handleMove(e));
        this.card.addEventListener('mouseleave', () => this.handleLeave());
    }
    
    handleMove(e) {
        const x = e.layerX;
        const y = e.layerY;
        const yRotation = 20 * ((x - this.width / 2) / this.width);
        const xRotation = -20 * ((y - this.height / 2) / this.height);
        
        this.card.style.transform = `perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        this.card.style.boxShadow = `${-yRotation / 2}px ${xRotation / 2}px 15px rgba(0,0,0,0.1)`;
    }
    
    handleLeave() {
        this.card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        this.card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    new SmoothScroll();
    
    // Typewriter effect
    const txtElement = document.querySelector('.typing-animation');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
    
    // Card tilt effect
    const cards = document.querySelectorAll('.info-card, .protocol-card');
    cards.forEach(card => new CardTilt(card));
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax'));
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Interactive hover effects
    const interactiveElements = document.querySelectorAll('.interactive-hover');
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Animated gradients
    const gradientElements = document.querySelectorAll('.animated-gradient');
    gradientElements.forEach(element => {
        element.style.animation = `gradientBG ${Math.random() * 5 + 5}s ease infinite`;
    });
});
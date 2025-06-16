// Datos para emergencias de salud
const healthData = [
    {
        id: 'ataque-cardiaco',
        title: 'Ataque Cardíaco',
        icon: '❤️',
        risk: 'high',
        riskText: 'Alto riesgo',
        time: '3 min lectura',
        recognition: 'Un ataque cardíaco ocurre cuando se bloquea el flujo de sangre al corazón. Reconozca los síntomas:',
        recognitionList: [
            'Dolor o presión en el pecho',
            'Dificultad para respirar',
            'Sudor frío',
            'Náuseas o mareos',
            'Dolor en brazo izquierdo o mandíbula'
        ],
        action: 'Siga estos pasos inmediatamente:',
        actionSteps: [
            'Llame a emergencias (911)',
            'Haga que la persona se siente o recueste',
            'Afloje ropa apretada',
            'Administre aspirina si está disponible y no hay alergias',
            'Prepárese para RCP si la persona pierde el conocimiento'
        ],
        emergencyNumber: '911'
    },
    // Más datos de salud...
];

// Datos para desastres naturales
const naturalData = [
    {
        id: 'terremoto',
        title: 'Terremoto',
        icon: '🌍',
        risk: 'high',
        riskText: 'Alto riesgo',
        time: '4 min lectura',
        recognition: 'Un terremoto es un movimiento súbito de la tierra causado por el rompimiento y desplazamiento de rocas. Señales:',
        recognitionList: [
            'Movimiento brusco del suelo',
            'Ruido subterráneo',
            'Objetos que se caen o rompen',
            'Interrupción de servicios básicos'
        ],
        action: 'Qué hacer durante y después:',
        actionSteps: [
            'DURANTE: Agáchese, cúbrase y sujétese',
            'Aléjese de ventanas y objetos que puedan caer',
            'Si está en cama, quédese allí y cubra su cabeza',
            'DESPUÉS: Revise lesiones y daños estructurales',
            'Escuche radio para información oficial',
            'Prepárese para réplicas'
        ],
        emergencyNumber: '911'
    },
    // Más datos naturales...
];

// Datos para accidentes
const accidentData = [
    {
        id: 'quemadura',
        title: 'Quemaduras',
        icon: '🔥',
        category: 'home',
        risk: 'medium',
        riskText: 'Riesgo medio',
        time: '2 min lectura',
        recognition: 'Las quemaduras pueden ser causadas por calor, químicos, electricidad o radiación. Clasificación:',
        recognitionList: [
            '1er grado: Enrojecimiento (ej. quemadura solar)',
            '2do grado: Ampollas y dolor intenso',
            '3er grado: Piel blanca o carbonizada, poco dolor'
        ],
        action: 'Primeros auxilios para quemaduras:',
        actionSteps: [
            'Enfriar con agua corriente (no muy fría) por 10-15 min',
            'No usar hielo, mantequilla u otros remedios caseros',
            'Cubrir con gasa estéril o paño limpio',
            'Para quemaduras graves, llamar a emergencias',
            'No quitar ropa pegada a la quemadura'
        ],
        emergencyNumber: '911'
    },
    // Más datos de accidentes...
];

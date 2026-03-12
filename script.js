document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');
    const plantContainer = document.querySelector('.plant-container');
    let isGrown = false;

    /* --- Lógica de la hora del día --- */
    const debugMode = false; // CAMBIA A FALSE PARA OCULTAR EL SLIDER Y USAR TIEMPO REAL

    const debugPanel = document.getElementById('debug-panel');
    const timeSlider = document.getElementById('time-slider');
    const timeDisplay = document.getElementById('time-display');

    function updateEnvironment(hour) {
        const body = document.body;
        body.classList.remove('time-dawn', 'time-day', 'time-afternoon', 'time-night');

        if (hour >= 5 && hour < 8) {
            body.classList.add('time-dawn');
        } else if (hour >= 8 && hour < 18) {
            body.classList.add('time-day');
        } else if (hour >= 18 && hour < 20) {
            body.classList.add('time-afternoon');
        } else {
            body.classList.add('time-night');
        }
    }

    function initTimeLogic() {
        if (debugMode) {
            // Modo Manual (DEBUG)
            debugPanel.classList.remove('hidden');

            // Configurar valor inicial basado en slider actual
            const currentSliderValue = parseInt(timeSlider.value);
            timeDisplay.textContent = currentSliderValue.toString().padStart(2, '0');
            updateEnvironment(currentSliderValue);

            // Escuchar cambios en el slider
            timeSlider.addEventListener('input', (e) => {
                const selectedHour = parseInt(e.target.value);
                timeDisplay.textContent = selectedHour.toString().padStart(2, '0');
                updateEnvironment(selectedHour);
            });
        } else {
            // Modo Automático (Real)
            debugPanel.classList.add('hidden');

            function setRealTime() {
                const currentHour = new Date().getHours();
                updateEnvironment(currentHour);
            }

            setRealTime(); // Llamada inicial
            setInterval(setRealTime, 60000); // 1 Vez por minuto
        }
    }

    initTimeLogic();

    /* --- Generación de Estrellas --- */
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 60}vh`; // Solo generarlas en un 60% inicial del cielo

        // Tamaños aleatorios muy pequeños (1px a 3px maximo)
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Destellos desincronizados
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;

        starsContainer.appendChild(star);
    }

    /* --- Lógica del Botón / Crecimiento --- */
    btn.addEventListener('click', () => {
        if (!isGrown) {
            plantContainer.classList.add('growing');
            btn.textContent = 'Observando el crecimiento...';
            btn.disabled = true;

            // Esperar a que la flor del centro (la más lenta) termine (2.7s + 1.5s = 4.2s aprox)
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Marchitar y reiniciar 🥀';
                isGrown = true;
            }, 4500);

        } else {
            plantContainer.classList.remove('growing');
            btn.textContent = 'Preparando tierra...';
            btn.disabled = true;

            // La reducción tarda aprox 1.5s
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Plantar y Crecer 🌷';
                isGrown = false;
            }, 2000);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');
    const plantContainer = document.querySelector('.plant-container');
    let isGrown = false;

    /* --- Lógica de la hora del día --- */
    const debugMode = false; // CAMBIAR A FALSE PARA OCULTAR EL SLIDER Y USAR TIEMPO REAL

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
            debugPanel.style.display = 'flex';

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
            debugPanel.style.display = 'none';

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

    /* --- Generación de Pasto Dinámico --- */
    const groundContainer = document.getElementById('ground-container');
    const totalGrass = 60; // Cantidad de brotes de pasto en toda la pantalla

    for (let i = 0; i < totalGrass; i++) {
        const grass = document.createElement('div');
        grass.classList.add('grass');
        
        // Distribuido en toda la pantalla X (0% a 100%)
        grass.style.left = `${Math.random() * 100}vw`;
        
        // Altura aleatoria entre 15px y 45px
        const height = Math.random() * 30 + 15;
        grass.style.height = `${height}px`;
        
        // Grosor estético levemente variable
        const width = Math.random() * 3 + 4; 
        grass.style.width = `${width}px`;

        // Desincronizar el movimiento del viento
        grass.style.animationDelay = `-${Math.random() * 3}s`;

        groundContainer.appendChild(grass);
    }

    /* --- Lógica del Botón / Crecimiento --- */
    let particleInterval = null;

    function createParticle() {
        if (!isGrown) return;

        const particlesContainer = document.getElementById('particles-container');
        const particle = document.createElement('div');
        particle.classList.add('magic-particle');

        // Seleccionar una flor aleatoriamente
        const flowers = document.querySelectorAll('.flower');
        if (flowers.length === 0) return;

        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        const flowerRect = randomFlower.getBoundingClientRect();
        const garden = document.querySelector('.garden');
        const gardenRect = garden.getBoundingClientRect();

        // Obtener el factor de escala visual aplicado a .garden en CSS (@media scale)
        const scale = gardenRect.width / garden.offsetWidth;

        // Calcular la posición interna relativa dividiendo entre la escala actual
        const relX = (flowerRect.left - gardenRect.left) / scale;
        const relY = (flowerRect.top - gardenRect.top) / scale;

        // Agregar un leve randomness (jitter)
        const posX = relX + (Math.random() * 40 - 10);
        const posY = relY + (Math.random() * 40 - 20);

        // Sombras de amarillos/dorados copiados de los tulipanes
        const colors = ['#ffe082', '#ffeb3b', '#ffc107', '#ffb300', '#ff9800'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Tamaño aleatorio pequeño
        const size = Math.random() * 6 + 3; // Entre 3 y 9 px

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = randomColor;

        // Duración de la animación flotante aleatoria (entre 2 y 4 segundos)
        const duration = Math.random() * 2000 + 2000;
        particle.style.animationDuration = `${duration}ms`;

        particlesContainer.appendChild(particle);

        // Limpieza de memoria tras terminar la animación
        setTimeout(() => {
            particle.remove();
        }, duration);
    }

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

                // Empezar a soltar partículas
                particleInterval = setInterval(createParticle, 300);
            }, 4500);

        } else {
            plantContainer.classList.remove('growing');
            btn.textContent = 'Preparando tierra...';
            btn.disabled = true;
            isGrown = false;

            // Detener partículas
            if (particleInterval) clearInterval(particleInterval);
            document.getElementById('particles-container').innerHTML = ''; // Limpiar restantes

            // La reducción tarda aprox 1.5s
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Plantar y Crecer 🌷';
            }, 2000);
        }
    });
});

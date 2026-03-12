document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');
    const plantContainer = document.querySelector('.plant-container');
    let isGrown = false;

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

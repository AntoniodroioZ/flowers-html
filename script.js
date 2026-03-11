document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');
    const tulip = document.querySelector('.tulip');
    let isGrown = false;

    btn.addEventListener('click', () => {
        if (!isGrown) {

            tulip.classList.add('growing');
            btn.textContent = 'Observando el crecimiento...';
            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Marchitar y reiniciar 🥀';
                isGrown = true;
            }, 4500);

        } else {
            tulip.classList.remove('growing');
            btn.textContent = 'Preparando tierra...';
            btn.disabled = true;

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Plantar y Crecer 🌷';
                isGrown = false;
            }, 2500);
        }
    });
});

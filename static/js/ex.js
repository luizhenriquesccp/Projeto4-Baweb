document.addEventListener('DOMContentLoaded', () => {
    // Seletores dos elementos
    const circle = document.getElementById('breathCircle');
    const startBtn = document.getElementById('btnIniciar');
    const pauseBtn = document.getElementById('btnPausar');
    const terminateBtn = document.getElementById('btnTerminar');
    const timeDisplay = document.getElementById('tempoTotal');

    // Busca o container do exercício (tem os atributos data-duracao e data-exercicio-id)
    const exBox = document.querySelector('[data-exercicio-id]') || document.querySelector('.ex-box');

    let timerInterval = null;
    let totalSeconds = 0;

    const exercicioId = exBox ? exBox.dataset.exercicioId : null;
    const duracaoMin = exBox && exBox.dataset.duracao ? parseFloat(exBox.dataset.duracao) : null;
    const targetSeconds = (duracaoMin && !isNaN(duracaoMin)) ? Math.round(duracaoMin * 60) : null;

    function startBreathing() {
        if (circle && !circle.classList.contains('animating')) circle.classList.add('animating');
    }

    function stopBreathing() {
        if (circle && circle.classList.contains('animating')) circle.classList.remove('animating');
    }

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        if (timeDisplay) timeDisplay.textContent = `TEMPO TOTAL:  ${minutes}:${seconds}`;
    }

    async function terminateAndSave(auto = false) {
        pauseTimer();

        if (totalSeconds === 0) {
            if (!auto) alert('Nenhum tempo foi registrado. Complete pelo menos 1 segundo do exercício.');
            return;
        }

        if (!exercicioId) {
            alert('Erro: identificador do exercício não encontrado.');
            return;
        }

        const praticaData = {
            id_exercicio: parseInt(exercicioId, 10),
            tempo_segundos: totalSeconds,
        };

        try {
            const response = await fetch('/salvar_pratica', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(praticaData),
            });

            const result = await response.json();
            if (result.success) {
                if (!auto) alert(result.message || 'Prática salva com sucesso!');
                window.location.href = '/historico';
            } else {
                alert(`Erro ao salvar: ${result.message}`);
            }
        } catch (error) {
            console.error('Falha na comunicação com o servidor:', error);
            alert('Não foi possível salvar a prática. Verifique sua conexão.');
        }
    }

    function startTimer() {
        if (timerInterval) return;
        startBreathing();
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateDisplay();

            if (targetSeconds !== null && totalSeconds >= targetSeconds) {
                terminateAndSave(true);
            }
        }, 1000);
    }

    function pauseTimer() {
        stopBreathing();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // Eventos
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (terminateBtn) terminateBtn.addEventListener('click', () => terminateAndSave(false));

    // Inicializa display com meta (opcional)
    if (targetSeconds !== null && timeDisplay) {
        const plannedMin = Math.floor(targetSeconds / 60);
        timeDisplay.textContent = `TEMPO TOTAL: 00:00 (Meta: ${plannedMin} min)`;
    }
});

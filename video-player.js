// Audio Reveal Module

const AUDIO_PATH = 'audio/reveal.mp3';

let revealAudio = null;

function showResultsNow() {
    if (!currentSeedingResults) return;
    for (let seed = 1; seed <= 6; seed++) {
        const el = document.getElementById(`seed${seed}`);
        el.textContent = `Seed #${seed}: ${currentSeedingResults[seed]}`;
        el.classList.add('filled', 'revealed');
    }
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

function playRevealSequence() {
    if (!currentSeedingResults) {
        showToast('No Results', 'Please generate seeds first!', 'error');
        return;
    }

    // Reset all results
    for (let seed = 1; seed <= 6; seed++) {
        const el = document.getElementById(`seed${seed}`);
        el.textContent = `Seed #${seed}: ---`;
        el.classList.remove('filled', 'revealed');
    }

    const resultsContainer = document.getElementById('resultsContainer');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Play audio
    revealAudio = new Audio(AUDIO_PATH);
    revealAudio.play().catch(() => {});

    // Disable play button during reveal
    const playBtn = document.getElementById('playRevealBtn');
    playBtn.disabled = true;

    if (isMobile) {
        // On mobile: just reveal in the normal results box
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        resultsContainer.requestFullscreen().catch(() => {});
    }

    // Reveal seeds 6 → 1 with 3 second delays
    const revealOrder = [6, 5, 4, 3, 2, 1];
    revealOrder.forEach((seed, index) => {
        setTimeout(() => {
            const el = document.getElementById(`seed${seed}`);
            el.textContent = `Seed #${seed}: ${currentSeedingResults[seed]}`;
            el.classList.add('filled', 'revealed');

            if (index === revealOrder.length - 1) {
                playBtn.disabled = false;
                showToast('Reveal Complete!', 'All seeds have been revealed!', 'success');
            }
        }, 2000 + index * 3400);
    });
}

// Apply/remove fullscreen-active class based on fullscreen state (desktop only)
document.addEventListener('fullscreenchange', () => {
    const resultsContainer = document.getElementById('resultsContainer');
    if (document.fullscreenElement) {
        resultsContainer.classList.add('fullscreen-active');
    } else {
        resultsContainer.classList.remove('fullscreen-active');
    }
});

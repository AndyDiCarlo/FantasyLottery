// Audio Reveal Module

const AUDIO_PATH = 'audio/reveal.mp3';

let revealAudio = null;

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

    // Go fullscreen on the results container
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.requestFullscreen().catch(() => {});

    // Play audio
    revealAudio = new Audio(AUDIO_PATH);
    revealAudio.play().catch(() => {});

    // Disable play button during reveal
    const playBtn = document.getElementById('playRevealBtn');
    playBtn.disabled = true;

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
        }, 1000 + index * 3800);
    });
}

// Exit fullscreen when Escape is pressed or fullscreen changes
document.addEventListener('fullscreenchange', () => {
    const resultsContainer = document.getElementById('resultsContainer');
    if (document.fullscreenElement) {
        resultsContainer.classList.add('fullscreen-active');
    } else {
        resultsContainer.classList.remove('fullscreen-active');
    }
});

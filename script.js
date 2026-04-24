// Default odds
let seedOdds = {
    position_1: [50, 25, 15, 7, 2, 1],
    position_2: [25, 35, 20, 12, 6, 2],
    position_3: [15, 20, 30, 20, 10, 5],
    position_4: [7, 12, 20, 30, 20, 11],
    position_5: [2, 6, 10, 20, 35, 27],
    position_6: [1, 2, 5, 11, 27, 54]
};

// Store the current seeding results
let currentSeedingResults = null;

// Toast notification function
function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✖',
        info: '🛈︎',
        warning: '⚠︎'
    };

    toast. innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            ${message ? `<div class="toast-message">${message}</div>` : ''}
        </div>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function generateSeeds() {
    // Collect player names
    const names = [];
    for (let i = 1; i <= 6; i++) {
        const name = document.getElementById(`player${i}`).value.trim();
        if (!name) {
            showToast('Missing Player', `Please enter a name for Player ${i}`, 'error');
            document.getElementById(`player${i}`).focus();
            return;
        }
        names.push(name);
    }

    // Assign seeds based on odds
    const availableSeeds = [1, 2, 3, 4, 5, 6];
    const seedingResults = {};

    names.forEach((name, index) => {
        const positionKey = `position_${index + 1}`;
        const odds = seedOdds[positionKey];

        // Filter odds for available seeds
        const availableOdds = odds.map((weight, seedIndex) =>
            availableSeeds.includes(seedIndex + 1) ? weight : 0
        );

        // Weighted random selection
        const seed = weightedRandomChoice(availableOdds);
        seedingResults[seed] = name;
        availableSeeds.splice(availableSeeds.indexOf(seed), 1);
    });

    // Store results globally
    currentSeedingResults = seedingResults;

    // Show play reveal button, hide results until revealed
    document.getElementById('playRevealBtn').style.display = 'block';

    // Reset all result items to hidden
    for (let seed = 1; seed <= 6; seed++) {
        const el = document.getElementById(`seed${seed}`);
        el.classList.remove('revealed');
    }

    showToast('Seeds Generated!', 'Click "Play Reveal" to reveal results!', 'success');
}

function weightedRandomChoice(weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for ( let i = 0; i < weights.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return i + 1;
        }
    }
    return weights.length;
}

function clearAll() {
    // Clear inputs
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`player${i}`).value = '';
    }

    // Clear results
    for (let seed = 1; seed <= 6; seed++) {
        const element = document.getElementById(`seed${seed}`);
        element.textContent = `Seed #${seed}: ---`;
        element.classList.remove('filled');
    }

    // Hide play reveal button
    document.getElementById('playRevealBtn').style.display = 'none';

    currentSeedingResults = null;

    document.getElementById('player1').focus();
}

function openOddsEditor() {
    const modal = document.getElementById('oddsModal');
    const tbody = document.getElementById('oddsTableBody');
    tbody.innerHTML = '';

    const positionLabels = [
        'Position 1 (Best)',
        'Position 2',
        'Position 3',
        'Position 4',
        'Position 5',
        'Position 6 (Worst)',
    ];

    for (let i = 1; i <= 6; i++) {
        const row = document.createElement('tr');
        const positionKey = `position_${i}`;

        row.innerHTML = `
            <td><strong>${positionLabels[i-1]}</strong></td>
            ${seedOdds[positionKey].map((odd, j) =>
                `<td><input type="number" min="0" step="0.1" value="${odd}"
                id="odds_${i}_${j+1}" /></td>`
            ).join('')}
        `;
        tbody.appendChild(row);
    }

    modal.classList.add('active');
}

function closeOddsEditor() {
    document.getElementById('oddsModal').classList.remove('active');
}

function saveOdds() {
    const newOdds = {};

    try {
        for (let i =1; i <= 6; i++) {
            const positionKey = `position_${i}`;
            const odds = [];

            for (let j = 1; j <= 6; j++) {
                const input = document.getElementById(`odds_${i}_${j}`);
                const value = parseFloat(input.value);

                if (isNaN(value) || value < 0) {
                    throw new Error('All odds must be non-negative numbers!');
                }
                odds.push(value);
            }

            if (odds.reduce((sum, val) => sum + val, 0) === 0) {
                throw new Error(`Position ${i} cannot have all zeros!`);
            }

            newOdds[positionKey] = odds;
        }

        seedOdds = newOdds;
        closeOddsEditor();
        showToast('Odds Update', 'Custom probablities saved successfully', 'success');
    } catch (error) {
        showToast('Invalid Input', error.message, 'error');
    }
}

function resetToDefault() {
    seedOdds = {
        position_1: [50, 25, 15, 7, 2, 1],
        position_2: [25, 35, 20, 12, 6, 2],
        position_3: [15, 20, 30, 20, 10, 5],
        position_4: [7, 12, 20, 30, 20, 11],
        position_5: [2, 6, 10, 20, 35, 27],
        position_6: [1, 2, 5, 11, 27, 54]
    };

    // Update the table
    for (let i = 1; i <= 6; i++) {
        const positionKey = `position_${i}`;
        for (let j = 1; j <= 6; j++) {
            const input = document.getElementById(`odds_${i}_${j}`);
            if (input) {
                input.value = seedOdds[positionKey][j - 1];
            }
        }
    }

    showToast('Reset Complete', 'Odds restored to default values', 'info');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('oddsModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeOddsEditor();
        }
    });
});

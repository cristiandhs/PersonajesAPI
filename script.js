const API_URL = 'https://rickandmortyapi.com/api/character';
const container = document.getElementById('charactersContainer');
const filter = document.getElementById('characterFilter');

// Fetch characters from API
async function fetchCharacters() {
    try {
        const response = await fetch(`${API_URL}?page=1`);
        const data = await response.json();
        return data.results.slice(0, 20)
    } catch (error) {
        console.error('Error fetching characters:', error);
        return [];
    }
}

// Render characters cards
function renderCharacters(characters) {
    container.innerHTML = characters.map(character => `
        <article class="character-card">
            <img src="${character.image}" alt="${character.name}" class="character-image">
            <div class="character-info">
                <h2 class="character-name">${character.name}</h2>
                <p class="character-species">${character.species}</p>
                <p>Status: ${character.status}</p>
                <p>Origin: ${character.origin.name}</p>
            </div>
        </article>
    `).join('');
}

// Populate filter options
function populateFilter(characters) {
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.name;
        option.textContent = character.name;
        filter.appendChild(option);
    });
}

// Filter characters
function filterCharacters(characters, selectedName) {
    return selectedName === 'all' 
        ? characters 
        : characters.filter(c => c.name === selectedName);
}

// Initialize app
async function init() {
    const characters = await fetchCharacters();
    if (characters.length) {
        populateFilter(characters);
        renderCharacters(characters);
        
        filter.addEventListener('change', (e) => {
            const filtered = filterCharacters(characters, e.target.value);
            renderCharacters(filtered);
        });
    }
}

init();
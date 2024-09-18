const charactersEl = document.getElementById('characters');
const nomeFiltro = document.getElementById('nm_filtro');
const StatusFiltro = document.getElementById('status_filtro');

/**
 * Cria uma função que atrasa a execução da função fornecida (func) até que um determinado tempo de espera (delay) tenha passado.
 * Se a função for chamada novamente antes do término do tempo de espera, o temporizador é reiniciado.
 *
 * @param {Function} func Função para aplicar debounce
 * @param {number} delay Tempo do debounce antes de executar a função (em milissegundos)
 * @returns {Function} Retorna uma nova função "debounced" que será executada após o tempo de espera
 */
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

async function getCharacters(name, status) {
    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }

        if (status) {
            url += `status=${status}`;
        }
    }

    const resposta = await fetch(url);
    const dado = await resposta.json();

    console.log(dado.results);
    return dado.results;
}

// getCharacters();

async function displayCharacters(name, status) {
    //pegar personagens filtrados
    const characters = await getCharacters(name, status);

    charactersEl.innerHTML = '';

    //resnderizar os personagens
    for (let character of characters) {
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
        <img src="${character.image}" draggable="false"/>
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Espécie: ${character.species}</p>
        `;

        charactersEl.appendChild(card);
    }
}

displayCharacters();

const displayCharactersDebounce = debounce(displayCharacters, 200);

nomeFiltro.addEventListener('input', () => {
    displayCharactersDebounce(nomeFiltro.value, StatusFiltro.value);
});

StatusFiltro.addEventListener('change', () => {
    displayCharactersDebounce(nomeFiltro.value, StatusFiltro.value);
});

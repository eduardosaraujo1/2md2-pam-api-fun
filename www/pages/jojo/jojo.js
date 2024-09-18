const searchInput = document.querySelector(".search-input");
function buildCard(character) {
    const stand = character.abilities.split(",")[0];
    const html = `
        <img
            src="https://jojos-bizarre-api.netlify.app/assets/${character.image}"
            alt=""
            class="foto-jojo"
        />
        <b>Nome:</b><span class="nome-jojo">${character.name}</span>
        <b>Habilidade:</b><span class="stand-jojo">${stand}</span>
        <b>Nacionalidade:</b
        ><span class="nacionalidade-jojo">${character.nationality}</span>
    `;

    const card = document.createElement("div");
    card.classList.add("jojo-card");
    card.innerHTML = html;
    const lista = document.querySelector(".lista");
    lista.appendChild(card);
}

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

async function safeGetRequst(query) {
    try {
        const result = await fetch(query);
        if (!result.ok) return [];
        return await result.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function apiSearch(query = "") {
    const apiUrl = new URL(
        "https://stand-by-me.herokuapp.com/api/v1/characters/query/query"
    );
    const fixedQuery = query.trim().toLowerCase();
    apiUrl.searchParams.append("name", fixedQuery);
    return await safeGetRequst(apiUrl);
}

function renderCards(cards) {
    for (const card of cards) {
        buildCard(card);
    }
}

async function runQuery() {
    const query = searchInput.value;
    const list = document.querySelector(".lista");
    list.innerHTML = "";

    const result = await apiSearch(query);
    if (Array.isArray(result)) {
        renderCards(result);
    } else {
        console.warn(`${result} não é um array`);
    }
}

const runQueryDebounce = debounce(runQuery, 200);
searchInput.addEventListener("input", () => {
    runQueryDebounce();
});

runQuery();

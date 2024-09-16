const card = document.querySelector('.weather-card');
const countrySelect = document.querySelector('#country-select');
const citySelect = document.querySelector('#city-select');
const form = document.querySelector('form');
/**
 *
 * @param {array} array String array
 */
function arrayToOptionList(array) {
    let html = '';
    for (const option of array) {
        const treatedOption = option.toLowerCase();
        let node;
        if (treatedOption.includes('mongagua')) {
            node = `<option selected value="${treatedOption}">${option}</option>\n`;
        } else {
            node = `<option value="${treatedOption}">${option}</option>\n`;
        }
        html += node;
    }
    return html;
}
function refreshCityList() {
    const country = countrySelect.value;
    const selectedCities = cities[country];

    if (!selectedCities) return;
    const html = arrayToOptionList(selectedCities);
    citySelect.innerHTML = html;
}

function load() {
    countrySelect.addEventListener('input', refreshCityList);
    refreshCityList();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        await resetCard();
        const data = new FormData(form);
        const city = data.get('city-select');
        const country = data.get('country-select');
        await loadWeatherDefinition(city, country);
        showCard();
    });
}

async function resetCard() {
    card.classList.add('weather-card--hide');
    card.classList.remove('weather-card--error');
    return new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
}

async function showCard() {
    card.classList.remove('weather-card--hide');
    return new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
}

load();

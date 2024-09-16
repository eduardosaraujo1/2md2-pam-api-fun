const countrySelect = document.querySelector('#country-select');
const citySelect = document.querySelector('#city-select');
const form = document.querySelector('form');
/**
 *
 * @param {array} array String array
 */
function arrayToOptionList(array) {
    let html = '';
    let treatedOption;
    for (const option of array) {
        treatedOption = option.toLowerCase();
        const node = `<option value="${treatedOption}">${option}</option>\n`;
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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const city = data.get('city-select');
        const country = data.get('country-select');
        loadWeatherDefinition(city, country);
    });
}

load();

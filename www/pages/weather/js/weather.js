class OpenWeather {
    getKey() {
        const keycontainer = document.getElementById('keyContainer');
        const value = keycontainer.value;
        return value.replace(/[^0-9a-f]/g, '').toLowerCase();
    }

    async sendRequest(url) {
        // fetch url
        let res = {};
        try {
            const response = await fetch(url);
            res = await response.json();
        } catch (error) {
            console.error(error);
            return {
                cod: 0,
                message: `Fetch error: ${error}`,
            };
        }

        return res;
    }

    /**
     *
     * @param {string} city Name of the city to get weather
     * @param {string} country ISO-3166 alpha-2 country code
     */
    async getCityWeather(city, country) {
        try {
            // Ensure country code is limited to 2 characters (if provided)
            country = country.slice(0, 2);
            const query = country ? `${city}, ${country}` : city;

            // Construct the base URL
            const baseurl =
                'https://api.openweathermap.org/data/2.5/weather?lang=pt_br&units=metric';
            const url = new URL(baseurl);
            url.searchParams.append('q', query);
            url.searchParams.append('appid', this.getKey());

            // Make the API request
            const result = await this.sendRequest(url);

            // If result is null or undefined, return an empty weather object
            if (!result) {
                return {};
            }

            // Handle errors that may come back from the API
            if (result.message) {
                if (result.message.includes('Invalid API key')) {
                    displayError(
                        'Não foi possível encontrar o clima dessa cidade (verifique a chave de acesso)'
                    );
                    return {};
                }
                throw new Error();
            }

            // Build the weather object
            const weatherObj = {
                'country-flag': `https://flagsapi.com/${country}/flat/64.png`,
                city: query,
                temperature: Math.round(result.main.temp),
                description: result.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`,
                wind: result.wind.speed.toString().replace(/\./g, ','),
                humidity: result.main.humidity,
            };

            return weatherObj;
        } catch (error) {
            // Catch any unexpected errors and handle them appropriately
            displayError(
                'Não foi possível encontrar o clima da cidade selecionada'
            );
            return {}; // Return an empty object in case of failure
        }
    }
}

function displayError(error) {
    console.error(error);

    // card error treatment
    const card = document.querySelector('.weather-card');
    const errorDisplay = document.querySelector('.card-error-message');
    card.classList.add('weather-card--error');
    errorDisplay.innerHTML = error;
}

function displayWeather(weatherObject) {
    for (const key in weatherObject) {
        const node = document.getElementById(key);
        if (node.nodeName.toLowerCase() === 'img') {
            node.setAttribute('src', weatherObject[key]);
        } else {
            node.innerHTML = weatherObject[key];
        }
    }
}

async function loadWeatherDefinition(city, country) {
    let w = await weather.getCityWeather(city, country);

    // Check if the weather object is not empty
    if (Object.keys(w).length > 0) {
        displayWeather(w);
    }
}

const weather = new OpenWeather();

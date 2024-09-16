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
        country = country.slice(0, 2);
        const query = country ? `${city}, ${country}` : city;
        const baseurl =
            'https://api.openweathermap.org/data/2.5/weather?lang=pt_br&units=metric';
        const url = new URL(baseurl);
        url.searchParams.append('q', query);
        url.searchParams.append('appid', this.getKey());

        const result = await this.sendRequest(url);
        const weatherObj = {};
        if (result == null) {
            return weatherObj;
        }

        // build weatherobj
        weatherObj[
            'country-flag'
        ] = `https://flagsapi.com/${country}/flat/64.png`;
        weatherObj['city'] = query;
        weatherObj['temperature'] = Math.round(result['main']['temp']);
        weatherObj['description'] = result['weather'][0]['description'];
        const icon = result['weather'][0]['icon'];
        weatherObj['icon'] = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        weatherObj['wind'] = result['wind']['speed']
            .toString()
            .replace(/\./g, ',');
        weatherObj['humidity'] = result['main']['humidity'];
        return weatherObj;
    }
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
    displayWeather(w);
}

const weather = new OpenWeather();

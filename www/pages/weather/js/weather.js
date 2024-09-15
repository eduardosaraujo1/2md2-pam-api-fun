class OpenWeather {
    constructor(key) {
        this.key = key;
    }
}

/**
 *
 * @param {string} dbPath Path for the file
 * @returns {object} Object with the city dictionary (empty object if the request failed)
 */
async function readCityDatabase(dbPath = '/www/js/data/cities.json') {
    let result = {};
    try {
        const response = await fetch(dbPath);
        if (!response.ok) {
            throw new Error(
                `Invalid response: ${response.status} - ${response.statusText}`
            );
        }
        result = await response.json();
    } catch (e) {
        console.error(e);
    } finally {
        return result;
    }
}

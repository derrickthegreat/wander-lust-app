import { FS_KEY, FS_SECRET, OW_KEY } from './keys.js';

// FourSquare Variables
const clientId = FS_KEY;
const clientSecret = FS_SECRET;
const url = `https://api.foursquare.com/v2/venues/explore?client_id=` + clientId + `&client_secret=` + clientSecret + `&near=`;

// OpenWeather Variables
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const appId = `&appid=` + OW_KEY;

// DOM Mapping
const inputField = document.getElementById('city');
const submitBtn = document.getElementById('button');
const destination = document.getElementById('destination');
const container = document.getElementsByClassName('container');
const venue1 = document.getElementById('venue1');
const venue2 = document.getElementById('venue2');
const venue3 = document.getElementById('venue3');
const venueDivs = [venue1, venue2, venue3];
const weatherDiv = document.getElementById('weather1');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

submitBtn.addEventListener('click', executeSearch, false);



// AJAX Functions
async function getVenues() {
    const city = inputField.value;
    const urlToFetch = url + city + `&limit=5` + `&v=20210705`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            // console.log(venues);
            return venues;
        }
        throw new Error('Unable to pull venues.');
    } catch(err) {
        console.log(err);
    };
};

async function getForecast() {
    const city = inputField.value;
    const urlToFetch = weatherURL + city + `&units=imperial` + appId ;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            /*
            jsonResponse.name - City Name
            jsonResponse.main
                    ""       .feels_like
                    ""       .temp
                    ""       .temp_min
                    ""       .temp_max
            jsonResponse.weather - Weather Conditions (raining, cloudy)
            */
            return jsonResponse
        }
        throw new Error('Unable to pull weather.');
    } catch(err) {
        console.log(err);
    }
}

function executeSearch(e) {
    e.preventDefault();
    //clear dom elements
    getForecast();
    getVenues();
};
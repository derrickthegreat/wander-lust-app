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
const results = document.querySelector('.results');
const weatherDiv = document.getElementById('weather1');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const venues = document.querySelector('.venues');

submitBtn.addEventListener('click', executeSearch, false);


// Functions

function executeSearch(e) {
    e.preventDefault();
    domReset();
    getForecast().then(response => renderWeather(response));
    getVenues().then(response => renderVenues(response));
    results.style.visibility = 'visible';
};

function domReset() {
    while(destination.firstChild) {
        destination.removeChild(destination.firstChild);
    };
    while(weatherDiv.firstChild) {
        weatherDiv.removeChild(weatherDiv.firstChild);
    };
    while(venues.firstChild) {
        venues.removeChild(venues.firstChild);
    };
}

// Code to Render Venue Weather Data

function renderWeather(response) {
    const city = document.createElement('p');
    const icon = document.createElement('img')
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const day = document.createElement('p');
    const feelsLike = document.createElement('p');
    const temp = document.createElement('p');
    const conditions = document.createElement('p');
    icon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    h2.innerText = 'Things to do in';
    h3.innerText = response.name;
    city.appendChild(h2);
    city.appendChild(h3);
    day.innerText = getDate();
    temp.innerText = `Current Temp: ` + response.main.temp + `°F`;
    feelsLike.innerText = `Feels Like: ` + response.main.feels_like + `°F`;
    conditions.innerText = response.weather[0].description;
    destination.appendChild(city);
    // weatherDiv.appendChild(day);
    weatherDiv.appendChild(conditions);
    weatherDiv.appendChild(icon);
    weatherDiv.appendChild(temp);
    weatherDiv.appendChild(feelsLike);
    
}

function getDate() {
    const date = new Date();
    let day = date.getDay();
    return weekDays[day];
}


// Code to Render Venue data

function renderVenues(response) {
    for(let i = 0; i < response.length; i++) {
        let venue = generateVenueElement(response[i]);
        venues.appendChild(venue);
    }
}

function generateVenueElement(obj) {
    const article = document.createElement('article');
    const name = document.createElement('h3');
    const icon = document.createElement('img');
    const h4 = document.createElement('h4');
    const address = document.createElement('p');
    const city = document.createElement('p');
    const zip = document.createElement('p');
    article.className = 'card'
    name.innerText = obj.name;
    icon.src = obj.categories[0].icon.prefix + 'bg_64' + obj.categories[0].icon.suffix 
    h4.innerText = `Address:`;
    address.innerText = obj.location.address;
    city.innerText = obj.location.city;
    zip.innerText = obj.location.postalCode;
    let elements = [name, icon, h4, address, city, zip];
    elements.forEach(element => article.appendChild(element));
    return article;
}


// AJAX Functions
async function getVenues() {
    const city = inputField.value;
    const urlToFetch = url + city + `&limit=10` + `&v=20210705`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            console.log(venues[0]);
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
            console.log(jsonResponse)
            return jsonResponse
        }
        throw new Error('Unable to pull weather.');
    } catch(err) {
        console.log(err);
    }
}

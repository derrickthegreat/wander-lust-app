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
const submitButton = document.getElementById('button');
const destination = document.getElementById('destination');
const container = document.getElementsByClassName('container');
const venue1 = document.getElementById('venue1');
const venue2 = document.getElementById('venue2');
const venue3 = document.getElementById('venue3');
const venueDivs = [venue1, venue2, venue3];
const weatherDiv = document.getElementById('weather1');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX Functions

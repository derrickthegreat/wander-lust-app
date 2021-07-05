import { FS_KEY, FS_SECRET, OW_KEY } from './keys.js';

// FourSquare Variables
const clientId = FS_KEY;
const clientSecret = FS_SECRET;
const url = `https://api.foursquare.com/v2/venues/explore?client_id=` + clientId + `&client_secret=` + clientSecret;
// FS Query Params:
const nearParam = `&near=`;

// OpenWeather Variables
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const appId = `&appid=` + OW_KEY;

// DOM Mapping


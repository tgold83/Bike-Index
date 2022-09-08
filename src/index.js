import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StolenBikeService from './stolen-bike-service.js'

// Business Logic

function stolenBike(location) {
  let promise = StolenBikeService.stolenBike(location);
  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, city) { 
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${(1.8 * (apiResponse.main.temp-273))+32} degrees.
  The temperature in Kelvin is ${apiResponse.main.temp} degrees.
  The timezone is ${apiResponse.timezone}.
  The tempurature feels like ${apiResponse.main.feels_like} degrees Kelvin.
  Sunrise will occur at ${apiResponse.sys.sunrise} UTC.
  Sunset will occur at ${apiResponse.sys.sunset} UTC.`; 
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import StolenBikeService from './stolen-bike-service.js';

// Business Logic

function stolenBike(location) {
  StolenBikeService.stolenBike(location)
    .then(function(response) {
      if (response.bikes) {
        printElements(response, location);
      } else {
        printError(response, location);
      }
    });
}

// UI Logic

function printError(error, location) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the stolen bike data for ${location}: ${error}`;
}

function printElements(response) { 
  console.log("Type of response.bikes " + typeof response.bikes[1] + response.bikes[1]);

  let bikeArray = response.bikes;
  for (let i = 0; i < bikeArray.length; i ++) {
    let bike = document.createElement("p");
    bike.innerText = bikeArray[i]["frame_model"];
    document.querySelector('#showResponse').append(bike); 
  }  
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  // document.querySelector('#location').value = null;
  stolenBike(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

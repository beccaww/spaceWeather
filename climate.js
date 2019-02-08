'use strict';

const apiKey2 = '3b7a69e40086f0bc0d16cbda86f286d2876228d2';
const searchURL2 = 'https://app.climate.azavea.com/api/climate-data/';


function getClimate(name, label, description,) {
    const params = {
      api_key: apiKey2,
      name: name, 
      label: label, 
      description: description,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL2 + name + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
      })
      .then(displayResults)
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function displayResults(responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the items array
    responseJson.forEach(application => {
      $('#results-list-earth').append(
        `<li>
          <p>${application.name}</p>
          <p>${application.label}</p>
          <p>${application.description}</p>
         </li>`
     );
    });
    //display the results section  
    $('#results-list').removeClass('hidden');
  };

function watchForm2() {
    $('form').submit(event => {
        event.preventDefault();
        const name = $('.name').val();
        const label = $('.label').val();
        const description = $('.description').val();
        getClimate(name, label, description);
        });
      }

$(watchForm2);
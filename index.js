'use strict';

//function that listens for the form submit

//function that handles the fetch

//function that displays the results of the search

//function that loads at the first load of the page

'use strict';

const apiKey = 'xrVbUsjvIHtShE1PeC6Qxe4C18IEpT0UwRC6j3X3'; 
const searchURL = 'https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=xrVbUsjvIHtShE1PeC6Qxe4C18IEpT0UwRC6j3X3';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getSpaceWeather(query) {
  const params = {
    key: apiKey,
    type:  'all, FLR, SEP, CME, IPS, MPC, GST, RBE'
    startDate: 'yyyy-MM-dd',
    endDate: 'yyyy-MM-dd', 
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getSpaceWeather(searchTerm, maxResults);
  });
}

$(watchForm);
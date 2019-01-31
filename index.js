'use strict';

const apiKey = 'xrVbUsjvIHtShE1PeC6Qxe4C18IEpT0UwRC6j3X3'; 
const searchURL = 'https://api.nasa.gov/DONKI/';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function renderFLR(responseJson) {
  $('#results-list').empty();
    // iterate through the items array
    responseJson.forEach(message => {
      $('#results-list').append(
        `<li>
          <p>${message.flrID}</p>
         </li>`
     );
    });
    //display the results section  
    $('#results-list').removeClass('hidden');
};

function renderSEP(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    responseJson.forEach(message => {
      $('#results-list').append(
        `<li>
          <p>${message.sepID}</p>
         </li>`
      );
    });
    $('#results-list').removeClass('hidden');
};

function renderCME(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.forEach(message => {
    $('#results-list').append(
      `<li>
        <p>${message.activityID}</p>
        <p>${message.note}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function renderIPS(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.forEach(message => {
    $('#results-list').append(
      `<li>
        <p>${message.activityID}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function renderGST(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.forEach(message => {
    $('#results-list').append(
      `<li>
        <p>${message.gstID}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function renderRBE(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.forEach(message => {
    $('#results-list').append(
      `<li>
        <p>${message.rbeID}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function getSpaceWeather(type, startDate, endDate) {
  const params = {
    api_key: apiKey,
    //type:  type,
    startDate: startDate,
    endDate: endDate, 
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + type + '?' + queryString;

let renderMethod; 

if (type === 'FLR') {
  renderMethod = renderFLR; 
} else if (type === 'SEP') {
  renderMethod = renderSEP;
} else if (type === 'CME') {
  renderMethod = renderCME; 
} else if (type === 'IPS') {
renderMethod = renderIPS; 
} else if (type === 'GST') {
  renderMethod = renderGST; 
} else if (type === 'RBE') {
  renderMethod = renderRBE; 
}; 

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(renderMethod)
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


//function displayResults(responseJson) {
    //console.log(responseJson);
    // if there are previous results, remove them
    //$('#results-list').empty();
    // iterate through the items array
    //responseJson.forEach(message => {
      //$('#results-list').append(
        //`<li>
          //<p>${message.flrID}</p>
          //<p>${message.sepID}</p>
         //</li>`
     //);
    //});
    //display the results section  
    //$('#results-list').removeClass('hidden');
  //};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const type = $('.weather').val();
    const startDate = $('.startDate').val();
    const endDate = $('.endDate').val();
    getSpaceWeather(type, startDate, endDate);
  });
}

$(watchForm);
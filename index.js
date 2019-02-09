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
          <p>Flare ID: ${message.flrID}</p>
          <p>Begin Time: ${message.beginTime}</p>
          <p>Class Type: ${message.classType}</p>
          <p>Peak Time: ${message.peakTime}</p>
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
          <p>ID: ${message.sepID}</p>
          <p>Event Time: ${message.eventTime}</p>
          <p>Instruments: ${message.instruments}</p>
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
        <p>Activity ID: ${message.activityID}</p>
        <p>Start Time: ${message.startTime}</p>
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
        <p>ID: ${message.activityID}</p>
        <p>Location: ${message.location}</p>
        <p>Event Time: ${message.eventTime}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function renderMPC(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.forEach(message => {
    $('#results-list').append(
      `<li>
        <p>ID: ${message.mpcID}</p>
        <p>Event Time: ${message.eventTime}</p>
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
        <p>ID: ${message.gstID}</p>
        <p>Start Time: ${message.startTime}</p>
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
        <p>ID: ${message.rbeID}</p>
        <p>Event Time: ${message.eventTime}</p>
        <p>Instruments: ${message.instruments}</p>
       </li>`
    );
  });
  $('#results-list').removeClass('hidden');
};

function getSpaceWeather(startDate, endDate) {
  const types = ['FLR', 'SEP', 'CME', 'GST'];
  const params = {
    api_key: apiKey,
    //type:  type,
    startDate: startDate,
    endDate: endDate, 
  };


const fetches = types.map((type) => {
  const queryString = formatQueryParams(params);
  const url = searchURL + type + "?" + queryString;
  return fetch(url);
});

Promise.all(fetches).then(renderGraph);
}


function renderGraph(dataForEachType) {
  const flr = dataForEachType[0];
  const sep = dataForEachType[1];
  const cme = dataForEachType[2];
  const gst = dataForEachType[3];


  // sum the counts for each day for each type of event
  //needs to sum up occurences and then return an array
  // then get the sum of that array 

  var occurencesFLR = data.reduce(function(accumulator, currentValue) {
    return [...accumulator, ...currentValue.beginTime];
  })

  console.log(occurencesFLR); 


  // adding data to graph
  dps.push(flr);
  dps.push(sep);
  dps.push(cme);
  dps.push(gst);

  // rendering new data points
  chart.render();
}

var renderButton = document.getElementById('renderButton');
//renderButton.addEventListener('click', renderGraph);


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const startDate = $('.startDate').val();
    const endDate = $('.endDate').val();
    getSpaceWeather(startDate, endDate);
    renderGraph(dataForEachType); 
  });
}

$(watchForm);
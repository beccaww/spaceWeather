"use strict";

const apiKey = "xrVbUsjvIHtShE1PeC6Qxe4C18IEpT0UwRC6j3X3";
const searchURL = "https://api.nasa.gov/DONKI/";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function renderFLR(responseJson) {
  $("#results-list").empty();
  // iterate through the items array
  responseJson.forEach(message => {
    $("#results-list").append(
      `<li>
          <p>Flare ID: ${message.flrID}</p>
          <p>Begin Time: ${message.beginTime}</p>
          <p>Class Type: ${message.classType}</p>
          <p>Peak Time: ${message.peakTime}</p>
         </li>`
    );
  });
  //display the results section
  $("#results-list").removeClass("hidden");
}

function renderSEP(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  responseJson.forEach(message => {
    $("#results-list").append(
      `<li>
          <p>ID: ${message.sepID}</p>
          <p>Event Time: ${message.eventTime}</p>
          <p>Instruments: ${message.instruments}</p>
         </li>`
    );
  });
  $("#results-list").removeClass("hidden");
}

function renderCME(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  responseJson.forEach(message => {
    $("#results-list").append(
      `<li>
        <p>Activity ID: ${message.activityID}</p>
        <p>Start Time: ${message.startTime}</p>
        <p>${message.note}</p>
       </li>`
    );
  });
  $("#results-list").removeClass("hidden");
}

function renderGST(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  responseJson.forEach(message => {
    $("#results-list").append(
      `<li>
        <p>ID: ${message.gstID}</p>
        <p>Start Time: ${message.startTime}</p>
       </li>`
    );
  });
  $("#results-list").removeClass("hidden");
}


function getDates(){
// needs to convert month/year to startDate and endDate
  if (monthOption === "JAN" && year === "2011") {
    startDate = 01-01-2011
    endDate = 01-30-2011
  }
  else if (month === "FEB" && year === "2011") {
    startDate = 02-01-2011
    endDate = 02-28-2011
  }

}

function getSpaceWeather(startDate, endDate) {
  getDates(); 
  const types = ["FLR", "SEP", "CME", "GST"];
  const params = {
    api_key: apiKey,
    //type:  type,
    startDate: startDate,
    endDate: endDate
  };

  const fetches = types.map(type => {
    const queryString = formatQueryParams(params);
    const url = searchURL + type + "?" + queryString;
    return fetch(url).catch((res) => {
      console.error('There was an error', res);
    }).then(res => res.json()).catch(() => []);
  });

  Promise.all(fetches).then(renderGraph);
}

function getDateHistogram(data, /* startTime... */ time) {
  const histogram = data
    .reduce(function(acc, event) {
      return [...acc, event[time]];
    }, [])
    .map(time => {
      // transform 2017-01-01T01:01Z -> 2017-01-01
      return time.slice(0, 10);
    })
    .reduce((counts, time) => {
      const count = counts[time] || 0;
      counts[time] = count + 1;
      return counts;
    }, {});
  
  const series = Object.keys(histogram).map((date) => {
    return {
      x: new Date(date),
      y: histogram[date]
    };
  });

  return series;
}

function resetArray(arr, newArr) {
  arr.length = 0;
  arr.push(...newArr);
}

function renderGraph(dataForEachType) {
  const flr = dataForEachType[0]; // beginTime
  const sep = dataForEachType[1]; // eventTime
  const cme = dataForEachType[2]; // startTime
  const gst = dataForEachType[3]; // startTime

  // adding data to graph
  resetArray(dps.flr, getDateHistogram(flr, 'beginTime'));
  resetArray(dps.sep, getDateHistogram(sep, 'eventTime'));
  resetArray(dps.cme, getDateHistogram(cme, 'startTime'));
  resetArray(dps.gst, getDateHistogram(gst, 'startTime'));

  // rendering new data points
  chart.render();
}

var renderButton = document.getElementById("renderButton");
//renderButton.addEventListener('click', renderGraph);

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const startDate = $(".startDate").val();
    const endDate = $(".endDate").val();
    getSpaceWeather(startDate, endDate);
  });
}

$(watchForm);

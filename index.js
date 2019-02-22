"use strict";

const apiKey = "xrVbUsjvIHtShE1PeC6Qxe4C18IEpT0UwRC6j3X3";
const searchURL = "https://api.nasa.gov/DONKI/";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

//Get month range for the graph
function getMonthRange(year, month) {
  const start = new Date();

  start.setUTCFullYear(year);
  start.setUTCMonth(month - 1);
  start.setUTCDate(1);

  const end = new Date(start.getTime());
  end.setUTCMonth(end.getUTCMonth() + 1);

  return {
    startDate: start.toISOString().substr(0, 10),
    endDate: end.toISOString().substr(0, 10)
  };
}

function getSpaceWeather(year, month) {
  const { startDate, endDate } = getMonthRange(year, month); 
  const types = ["FLR", "SEP", "CME", "GST"];
  const params = {
    api_key: apiKey,
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

//Getting the number of occurances for each phenomena
function getDateHistogram(data, time) {
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

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const month = parseInt($("[name=\"month\"]:checked").val(), 10);
    const year = parseInt($(".year").val(), 10);
    getSpaceWeather(year, month);
  });
}

function watchMonthClick() {
  $('input[name="month"]').on('click', (e) => {
    e.preventDefault();
    $('.selected-month').removeClass('selected-month');
    $(e.currentTarget).parent().addClass('selected-month');
  });
}


$(watchForm());

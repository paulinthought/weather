import * as Constants from './constants';
import Flux from '../dispatcher/AppDispatcher';
import http from 'http';
import Logger from 'js-logger';
import moment from 'moment';

export class Actions {
  
  setMapReady() {
    Flux.dispatch({
      actionType: Constants.APP_MAP_READY
    });    
  }

  setWeather(center) {

    return http.get({
      host: 'api.openweathermap.org',
      path: '/data/2.5/forecast?lat='+center.lat+'&lon='+center.lng+'&appid='+process.env.WEATHER_API_KEY
    }, function(response) {
      // Continuously update stream with data
      let body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {
        let parsed = JSON.parse(body);
        let opts = getOptions(parsed);
        let weatherReport = getWeather(parsed);

        Flux.dispatch({
          actionType: Constants.APP_SET_WEATHER,
          options: opts,
          weather: weatherReport
        });

      });
    });
  }

  setSelected(option) {
    Flux.dispatch({
      actionType: Constants.APP_SET_SELECTED,
      selected: option
    });    
  }

};

function getOptions(jsonweather) {
  let weatherReport = [];
  jsonweather.list.forEach((item) => {
    weatherReport.push({
      value: item.dt_txt,
      label: moment(item.dt_txt, 'YYYY-MM-DD HH:mm:ss').format('Do MMM H:mm')
    });
  });
  return weatherReport;
}

function getWeather(jsonweather) {
  let weatherReport = {};
  jsonweather.list.forEach((item) => {
    weatherReport[item.dt_txt] = item.weather[0].description
  });
  
  return weatherReport;
}
  

export default new Actions();

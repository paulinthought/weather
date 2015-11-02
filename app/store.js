import Assign from 'object-assign';
import * as Constants from './constants';
import { EventEmitter } from 'events';
import Flux from '../dispatcher/AppDispatcher';
import Immutable from 'immutable';

let CHANGE_EVENT = 'change';

let _store = Immutable.Map({
  center: {
    lat: 52.102,
    lng: 9.12
  },
  mapReady: undefined,
  options: [],
  weather: undefined,
  zoom: 8
});

let Store = Assign({}, EventEmitter.prototype, {

  getState: function() {
      return _store;
  },
  
  emitChange: function() {
    this.emit(CHANGE_EVENT, this);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  
});

Flux.register(function(action) {  

  switch(action.actionType) {

    case Constants.APP_SET_WEATHER:  
      _store = _store.merge({
        options: action.options,
        weather: action.weather
      });
      Store.emitChange();
      break;

    case Constants.APP_MAP_READY:
      _store = _store.merge({
        mapReady: true
      });
      Store.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = Store;

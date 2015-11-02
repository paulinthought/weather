import Actions from './actions';
import Map from './map';
import Immutable from 'immutable';
import GoogleMapsLoader from 'google-maps';
import Logger from 'js-logger';
import React from 'react'; 
import ReactDOM from 'react-dom';
import Store from './store';
import Weather from './weather';

GoogleMapsLoader.KEY = process.env.MAPS_API_KEY;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = Store.getState().toJS();
  }

  componentWillMount() {
    Store.addChangeListener(this._onAppStoreChange.bind(this));
    // Load google-maps library
    GoogleMapsLoader.load((google) => { 
      Actions.setMapReady();
    });
    Actions.setWeather(this.state.center);
  }
  
  componentWillUnmount() {
    Store.removeChangeListener(this._onAppStoreChange.bind(this));
    GoogleMapsLoader.release();
  }

  render() {
    let map = !!this.state.mapReady ? <Map center={this.state.center} zoom={this.state.zoom} /> : (<span></span>);
  	return ( 
      <div className='container'> 
        <div className='row'>
          <div className='eight columns'>
            {map}
          </div>
          <div className='four columns'>
            <Weather options={this.state.options} weather={this.state.weather} />
          </div>
        </div>
      </div>
    );
  }

  _onAppStoreChange() {
    this.setState(Store.getState().toJS());
    Logger.info('AppContainer.appstate', this.state)
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
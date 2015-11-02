import Logger from 'js-logger';
import React from 'react'; 
import ReactDOM from 'react-dom';

module.exports = React.createClass({

  componentDidMount: function componentWillMount() {
    let cls = document.createAttribute("class");
    cls.value='map'
    let div = document.createElement('div');
    div.setAttributeNode(cls);

    // create a marker
    // TODO: add marker to map with label etc
    let marker = new window.google.maps.Marker({
      anchorPoint:  new window.google.maps.Point({x: this.props.center.lat, y: this.props.center.lng})
    })

    let map = new window.google.maps.Map(div, {
      center: new window.google.maps.LatLng(this.props.center.lat, this.props.center.lng),
      zoom: this.props.zoom
    }); 

    // Attach the map
    ReactDOM.findDOMNode(this.refs.placeholder).appendChild(map.getDiv());
    this.forceUpdate();
  },
  
  render: function() {
      return (<div ref='placeholder' />);
  }

});

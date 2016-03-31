import DropDown from 'react-dropdown';
import React from 'react';

export default class WeatherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    }
  }

  // set the requested time for the weather forecast from dropdown
  setSelected(options) {
    console.log(options, this.props)
    this.setState({selected: this.props.weather[options.value]});
  }

  render() {
    return (
      <div>
        <DropDown options={this.props.options} onChange={this.setSelected.bind(this)}/>
        <div className='report'>{this.state.selected}</div>
      </div>
    );
  }
  
}

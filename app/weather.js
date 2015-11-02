import DropDown from 'react-dropdown';
import React from 'react';

export default class WeatherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    }
  }

  // ComponentWillReceiveProps(nextProps) {
  //   if (nextProps.options !== this.props.options) {
  //     this.setState({options: nextProps.options})
  //   }
  // }

  setSelected(options) {
    console.log(options, this.props)
    this.setState({selected: this.props.weather[options.value]});
  }

  render() {
    return (
      <div>
      <DropDown options={this.props.options} onChange={this.setSelected.bind(this)}/>
      <div>{this.state.selected}</div>
      </div>
      );
  }
  
}

import React, {Component} from 'react';
import './style.css';
//import tick from '../img/tick.svg';
import tickDone from '../img/tick-1.svg';


class ToDo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.toDo.isComplete == true) {
      var className = "complete";
    } else {
      className = "notComplete";
    }
    return (
      <div className={className}>
        <img src={tickDone}/>
        <p onClick={this.props.onClick}>
        {this.props.toDo.text}
        </p>
      </div>
      );
  }
}

export default ToDo
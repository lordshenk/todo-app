import React, {Component} from 'react';
import './style.css';
import tickDone from '../img/tick-1.svg';
import cross from '../img/cross.svg';


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
        <p 
          onClick={this.props.onClick}>
        {this.props.toDo.text}
        </p>
        <button onClick={this.props.onDelete}><img src={cross}/></button>
      </div>
      );
  }
}

export default ToDo
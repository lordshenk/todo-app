import React, {Component} from 'react';
import ToDo from './components/ToDo';
import './App.css';
import doubleCheck from './img/double-check.svg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      toDoList: [
      {text: 'Wakeup', isComplete: true},
      {text: 'Play Game', isComplete: false},
      {text: 'Study', isComplete: true},
      {text: 'Sleep', isComplete: true}],
      currentView: 'All'
    }
    this.eventClick = this.eventClick.bind(this);
    this.eventEnter = this.eventEnter.bind(this);
    this.eventTickAll = this.eventTickAll.bind(this);
    // this.eventChangePage = this.eventChangePage.bind(this);
    this.allDone = '';
    this.toDoList = this.state.toDoList;
    this.isActive = 'active';
  }
  
  eventClick(item, index) {
    
    return () => {
        let doList = this.state.toDoList;
        doList[index].isComplete = !doList[index].isComplete;
        this.setState({
          toDoList: doList
        })
        if (doList[index].isComplete == false) {
          this.allDone = '';
        }
        for (let i of doList) {
          if (i.isComplete == false) {
            return;
          }
        }
        this.allDone = 'allDone';
    }
  }
  eventEnter(event) {
    if (event.key == 'Enter') {
      let toDoList = this.state.toDoList;
      toDoList.push({text: event.target.value, isComplete: false});
      this.setState({toDoList});
      event.target.value = '';
      this.allDone = '';
    }
  }

  eventTickAll() {
    let toDoList = this.state.toDoList;
    for (let i of toDoList) {
      i.isComplete = true;
    }
    this.setState({toDoList})
    this.allDone = 'allDone';
  }
  
  render () {
    return (
      <div className="container">
        <h1>todos</h1>
        <div className="App">
          <div className="header">
            <img src={doubleCheck} 
              className={this.allDone} 
              onClick={this.eventTickAll}/>
            <input type="text"
              placeholder="New Todo"
              onKeyUp={this.eventEnter}/>
          </div>
          {this.toDoList.map((item, index) => {
            return (<ToDo
              toDo={item}
              key={index}
              onClick={this.eventClick(item, index)}/>)
          })}
        </div>
      </div>
    );
  }

}

export default App;

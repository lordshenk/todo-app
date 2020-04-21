import React, {Component} from 'react';
import ToDo from './components/ToDo';
import Footer from './components/Footer';
import './App.css';
import doubleCheck from './img/double-check.svg';

let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
let setItem = (list) => {
  list = JSON.stringify(list);
  localStorage.setItem('toDoList', list);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      toDoList: toDoList
    }
    this.onClear = this.onClear.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.eventDelete = this.eventDelete.bind(this);
    this.eventEnter = this.eventEnter.bind(this);
    this.eventTickAll = this.eventTickAll.bind(this);
    this.allDone = '';
    this.isActive = 'active';
  }

  eventClick(item, index) {
    
    return () => {
        let doList = this.state.toDoList;
        doList[index].isComplete = !doList[index].isComplete;
        this.setState({
          toDoList: doList
        })
        setItem(doList);
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

  eventDelete(item, index) {
    return () => {
      let doList = this.state.toDoList;
      let newList = [];
      for (var i in doList) {
        if(i != index) {
          newList.push(doList[i]);
        }
      }

      this.setState({
        toDoList: newList
      })
      setItem(newList);
      for (let i of newList) {
        if (i.isComplete == false) {
          this.allDone = '';
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
      setItem(toDoList);
      event.target.value = '';
      this.allDone = '';
    }
  }

  eventTickAll() {
    let toDoList = this.state.toDoList;
    if(toDoList.length == 0) {
      this.allDone = '';
      return;
    }
    for (let i of toDoList) {
      i.isComplete = true;
    }
    this.setState({toDoList});
    setItem(toDoList);
    this.allDone = 'allDone';
  }

  onClear() {
    let toDoList = [];
    for(let i of this.state.toDoList) {
      if(i.isComplete === false) {
        toDoList.push(i)
      } 
    }
    this.setState({toDoList});
    setItem(toDoList);
    this.allDone = '';
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
          {this.state.toDoList.map((item, index) => {
            return (<ToDo
              toDo={item}
              key={index}
              onClick={this.eventClick(item, index)}
              onDelete={this.eventDelete(item, index)}/>)
          })}
          
        </div>
        <Footer 
            toDo={this.state.toDoList}
            onClick={this.onClear}/>
      </div>
    );
  }

}

export default App;

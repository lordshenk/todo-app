import React from 'react';
import './style.css';

function Footer(props) {
  let {toDo, onClick} = props;
  let itemLeft = 0;
  for (let i of toDo) {
    if(i.isComplete === false) {
      itemLeft ++;
    }
  }
  return(
    <div className='Footer'>
      <p>{itemLeft} item left</p>
      <button onClick={onClick}>Clear completed</button>
    </div>

    )
}

export default Footer;
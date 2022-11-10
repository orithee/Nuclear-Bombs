import React from 'react';
import redArmy from '../assets/red-army.png';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div id="bg"></div>
        <img className="red-army-img left" src={redArmy} alt="red-army" />
        <img className="red-army-img right" src={redArmy} alt="red-army" />
      </header>
    );
  }
}

export default Header;

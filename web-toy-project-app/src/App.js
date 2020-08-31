/* boot strap */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Toast, Container, Button, Jumbotron } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { render } from 'react-dom';

/* UTIL Component */
function Random(min, max) {
  let randomValue = Math.floor(Math.random() * (max - min))
  return randomValue;
}
function RandomVariant() {
  let vari;
  let randomValue = Random(0, 3)
  if (randomValue == 0) {
    vari = "success";
  }
  else if (randomValue == 1) {
    vari = "warning";
  }
  else {
    vari = "danger";
  }
  return vari;
}

/* UI Component */
function ButtonList(props) {
  const buttonList = props.nameList;
  const buttons = buttonList.map((name, index) => {
    return (
      <Button key={index} variant={RandomVariant()} block onClick={() => props.displayDesc(index)}>{name}</Button>
    );
  });
  return buttons;
}



/* Main Component */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    {
      nameList: [
        ["하이눈"],
        ["신세계"],
        ["테넷"],
        ["우행시"],
        ["test_1"],
        ["test_2"],
      ],
      descList: [
        ["하이눈은,,,"],
        ["신세계는,,,"],
        ["테넷은,,,"],
        ["우행시는,,,"],
        ["test_1,,,"],
        ["test_2,,,"]
      ],
      currentName: "Hello, world!",
      currentDesc: "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.",
    }
    /* [참고] https://devlog.jwgo.kr/2018/08/20/set-state-undefined-error-in-react/ */
    this.displayDesc = this.displayDesc.bind(this)
  }


  displayDesc(index) {
    const movieName = this.state.nameList[index]
    const movieDesc = this.state.descList[index]

    // alert("displayDesc: " + movieName + ", " + movieDesc)

    this.setState({
      // concat 은,, 이어 붙이기임
      currentName: movieName,
      currentDesc: movieDesc,
    });
  }


  render() {
    return (
      <div className="Main">
        <div className="Navi">
          <ButtonList nameList={this.state.nameList} descList={this.state.descList} displayDesc={this.displayDesc}></ButtonList>
          {/* test */}
        </div>
        <div className="Right">
          <Jumbotron>
            <h1>{this.state.currentName}</h1>
            <br/>
            <p>{this.state.currentDesc}</p>
            {/* <p><Button variant="primary">Learn more</Button></p> */}
          </Jumbotron>
        </div>
      </div>
    );
  }
}

// export default App;
export default App;
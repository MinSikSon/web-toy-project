import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Jumbotron } from 'react-bootstrap';
import movie_image from './img/movie_image_1.jpg'


function CustomButton(props) {
  return <Button variant={props.variant} size="lg">{props.text}</Button>
}

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={movie_image} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="top">나에 대한 질문 란</div>
      <div className="middle">
        <div className="middle-top">
          <CustomButton variant="primary" text="1번 선택지" />{" "}
          <CustomButton variant="success" text="2번 선택지" />
        </div>
        <br />
        <div className="middle-bottom">
          <CustomButton variant="warning" text="3번 선택지" />{" "}
          <CustomButton variant="info" text="4번 선택지" />
        </div>
      </div>
      <div className="bottom">현재 페이지/전체 페이지</div>
    </div>
  );
}

export default App;


/* boot strap */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Toast, Container, Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';


function FuncToast(props) {
  /* useState - https://ko.reactjs.org/docs/hooks-reference.html#usestate */
  const [show, toggleShow] = useState(false);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">{props.name}</strong>
        </Toast.Header>
        {/* <Toast.Body>{children}</Toast.Body> */}
        <Toast.Body>nothing</Toast.Body>
      </Toast>
    </>
  );
}

// class RedefCarousel extends Carousel
// {
//   constructor(props)
//   {
//     super(props);

//   }
// };

function FuncCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
      interval="4000"
      fade="true"
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          // src="holder.js/800x400?text=First slide&bg=373940"
          src="https://movie-phinf.pstatic.net/20200728_86/15959209130236RePy_JPEG/movie_image.jpghttps://movie.naver.com/movie/bi/mi/basic.nhn?code=190010#"
          alt="Third slide"
        />
        <Carousel.Caption className="Caption">
          <h3>당신에게 줄 건 한 단어 ‘테넷’ “이해하지 말고 느껴라!”</h3>
          <p>시간의 흐름을 뒤집는 인버전을 통해 현재와 미래를 오가며 세상을 파괴하려는 사토르(케네스 브래너)를 막기 위해 투입된 작전의 주도자(존 데이비드 워싱턴). 인버전에 대한 정보를 가진 닐(로버트 패틴슨)과 미술품 감정사이자 사토르에 대한 복수심이 가득한 그의 아내 캣(엘리자베스 데비키)과 협력해 미래의 공격에 맞서 제3차 세계대전을 막아야 한다!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://movie-phinf.pstatic.net/20200706_191/1594001490577tifkl_JPEG/movie_image.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="Caption">
          <h3>태국에서 충격적인 납치사건이 발생하고</h3>
          <p>마지막 청부살인 미션을 끝낸 암살자 인남(황정민)은 그것이 자신과 관계된 것임을 알게 된다.
          인남은 곧바로 태국으로 향하고, 조력자 유이(박정민)를 만나 사건을 쫓기 시작한다.
          한편, 자신의 형제가 인남에게 암살당한 것을 알게 된 레이(이정재).
          무자비한 복수를 계획한 레이는 인남을 추격하기 위해 태국으로 향하는데...
          
          처절한 암살자 VS 무자비한 추격자
 멈출 수 없는 두 남자의 지독한 추격이 시작된다!.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://movie-phinf.pstatic.net/20200812_245/159719521887011fjF_JPEG/movie_image.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="Caption">
          <h3>“즐거운 여행 되세요~!”</h3>
          <p>인생 최고의 행운인 줄 알았다, 놈들이 타기 전까지...
          극강의 쫄깃함으로 빠른 완판을 기록하는 꽈배기 맛집 사장 '미영'은
          컴퓨터 수리 전문가 '석환'의 남다른 외조로 하와이 여행에 당첨되고,
          난생처음 해외 여행을 떠나게 된다.
          
          하지만 비밀 요원을 쫓는 테러리스트들도 같은 비행기에 오르고
          꿈만 같았던 여행은 아수라장이 된다.
          
          난데없는 비행기 납치 사건의 유일한 해결사가 되어버린 부부.
          평범했던 과거는 접어두고, 숨겨왔던 내공을 펼치며 인질이 된 승객을 구하기 시작한다!
          
          휴가 끝 ;; 작전 시작 ^^
 구하자 비행기! 가자 하와이로!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://raw.githubusercontent.com/ara-official/ARA/master/front-end/img/gauri.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
        <h3>제목”</h3>
          <p>내용</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

function App() {
  return (
    <div className="Main">
      <div className="Left">
        좌측<br/>
        좌측<br/>
        좌측<br/>
        좌측<br/>
      </div>
      <div className="Right">
        {/* <FuncToast name={"test"} /><br />
      <FuncToast name={"test"} /><br />
      <FuncToast name={"test"} /><br /> */}
        <FuncCarousel name={"test"} /><br />
        {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
        </header>
      </div> */}
      </div>
    </div>
  );
}

// export default App;
export default App;
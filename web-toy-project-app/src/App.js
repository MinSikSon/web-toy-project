/* boot strap */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Toast, Container, Button, Jumbotron } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { render } from 'react-dom';

import img_1 from './img/movie_image_1.jpg'
import img_2 from './img/movie_image_2.jpg'
import img_3 from './img/movie_image_3.jpg'
import img_4 from './img/movie_image_4.jpg'
import img_5 from './img/movie_image_5.jpg'
import img_6 from './img/movie_image_6.jpg'
import img_7 from './img/movie_image_7.jpg'
import img_8 from './img/movie_image_8.jpg'
import img_9 from './img/movie_image_9.jpg'
import img_10 from './img/movie_image_10.jpg'

const img_11 = 'https://raw.githubusercontent.com/ara-official/ARA/master/front-end/img/gauri.jpeg'

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
function GetVariant(variant_index, index){
  let vari;
  if (variant_index == index) {
    vari = "warning";
  }
  else {
    vari = "success";
  }
  return vari;
}

function GetImage(props)
{
  return(
  <img src={props.img_name} width="300"></img>
  );
}

/* UI Component */
function ButtonList(props) {
  const buttonList = props.nameList;
  const buttons = buttonList.map((name, index) => {
    return (
      <Button key={index} variant={GetVariant(props.variant, index)} block onClick={() => props.displayDesc(index)}>{name}</Button>
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
        ["테넷"],
        ["다만 악에서 구하소서"],
        ["오케이 마담"],
        ["극장판 짱구는 못말려"],
        ["캐리비안 해적과 마법 다이아몬드"],
        ["오! 문희"],
        ["강철비2: 정상회담"],
        ["남매의 여름밤"],
        ["후쿠오카"],
        ["시크릿 가든"],
      ],
      descList: [
        ["당신에게 줄 건 한 단어 ‘테넷’\
          “이해하지 말고 느껴라!”\
          시간의 흐름을 뒤집는 인버전을 통해 현재와 미래를 오가며 세상을 파괴하려는 사토르(케네스 브래너)를 막기 위해 투입된 작전의 주도자(존 데이비드 워싱턴). 인버전에 대한 정보를 가진 닐(로버트 패틴슨)과 미술품 감정사이자 사토르에 대한 복수심이 가득한 그의 아내 캣(엘리자베스 데비키)과 협력해 미래의 공격에 맞서 제3차 세계대전을 막아야 한다!"],
        ["태국에서 충격적인 납치사건이 발생하고\
        마지막 청부살인 미션을 끝낸 암살자 인남(황정민)은 그것이 자신과 관계된 것임을 알게 된다.\
        인남은 곧바로 태국으로 향하고, 조력자 유이(박정민)를 만나 사건을 쫓기 시작한다.\
        한편, 자신의 형제가 인남에게 암살당한 것을 알게 된 레이(이정재).\
        무자비한 복수를 계획한 레이는 인남을 추격하기 위해 태국으로 향하는데...\
        \
        처절한 암살자 VS 무자비한 추격자\
        멈출 수 없는 두 남자의 지독한 추격이 시작된다!"],
        ["“즐거운 여행 되세요~!”\
        인생 최고의 행운인 줄 알았다, 놈들이 타기 전까지...\
        극강의 쫄깃함으로 빠른 완판을 기록하는 꽈배기 맛집 사장 '미영'은\
         컴퓨터 수리 전문가 '석환'의 남다른 외조로 하와이 여행에 당첨되고,\
         난생처음 해외 여행을 떠나게 된다.\
         \
         하지만 비밀 요원을 쫓는 테러리스트들도 같은 비행기에 오르고\
         꿈만 같았던 여행은 아수라장이 된다.\
         \
         난데없는 비행기 납치 사건의 유일한 해결사가 되어버린 부부.\
         평범했던 과거는 접어두고, 숨겨왔던 내공을 펼치며 인질이 된 승객을 구하기 시작한다!\
         \
         휴가 끝 ;; 작전 시작 ^^\
         구하자 비행기! 가자 하와이로!"],
        ["줄거리\
        아름다운 호주의 한 섬으로 신혼여행을 떠난 짱구네 가족.\
         즐거운 시간도 잠시, 수수께끼 원주민 가면족에게 사로잡혀 아빠가 사라진다.\
         \
         이 섬에는 50년에 한 번 엄청난 보물을 얻을 수 있다는 전설이 있는데,\
         그 보물을 여는 열쇠가 바로 아빠라고?\
         여기에 보물을 노리는 트레저 헌터들까지 합세해 치열한 아빠 쟁탈전이 벌어지는데...!\
         위기에 처한 짱구네 가족은 무사히 아빠를 되찾을 수 있을까?"],
        ["<보스 베이비><마이펫의 이중생활> 제작진의\
        올여름 가장 신나는 쿨썸머 매직 어드벤처!\
        세계 제일의 캐리비안 해적 선장은\
         소원을 이뤄주는 마법 다이아몬드를 찾아 항해한다.\
         \
         그러던 중 보물의 행적을 알고 있다는\
         최강 뽀시래기 해적단을 만나 함께 보물섬으로 향한다.\
         \
         바다를 건너, 정글을 지나\
         욕심쟁이 뱀파이어왕 군단의 공격 속에서\
         마법 다이아몬드의 신비로운 빛을 발견하게 되는데…\
         \
         과연 소원을 이뤄주는 절대 보물의 주인은 누가 될까?!"],
        ["재훈아 안녕"],
        ["영한이 안녕"],
        ["배고프네"],
        ["머리아퐁~~"],
        ["시구릿가든"]
      ],
      imageList: [
        img_1,
        img_2,
        img_3,
        img_4,
        img_5,
        img_6,
        img_7,
        img_8,
        img_9,
        img_10,
        img_11,
      ],
      currentIndex: 10,
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
      currentIndex: index,
      // concat 은,, 이어 붙이기임
      currentName: movieName,
      currentDesc: movieDesc,
    });
  }


  render() {
    return (
      <div className="Main">
        <div className="Navi">
          <div>야~ 개어렵다</div>
          <br/>
          <ButtonList nameList={this.state.nameList} descList={this.state.descList} displayDesc={this.displayDesc} variant={this.state.currentIndex}></ButtonList>
          {/* test */}
        </div>
        <div className="Right">
          <Jumbotron>
            <h1>{this.state.currentName}</h1>
            <br/>
            <p>{this.state.currentDesc}</p>
            <br/>
            <GetImage img_name={this.state.imageList[this.state.currentIndex]}></GetImage>
            {/* <p><Button variant="primary">Learn more</Button></p> */}
          </Jumbotron>
        </div>
      </div>
    );
  }
}

// export default App;
export default App;
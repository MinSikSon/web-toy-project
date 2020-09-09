// import { Route } from 'react-router-dom';

import React from 'react';
// import { useState } from 'react';

// import logo from '../logo.svg';
import '../App.css';

import { Button, ButtonGroup, ToggleButton} from 'react-bootstrap';

// import movie_image from '../img/movie_image_1.jpg'
import sms from '../img/sms.jpeg'

import { ResultMain, Result_0, Result_1, Result_2, Result_3, Result_4, Result_5 } from '../result'


/* const */
const NUM_QUIZ = 5;

function ToggleButtonExample(props) {
    // Hook 도입 이유: [안봐도 됨] https://ko.reactjs.org/docs/hooks-intro.html
    // Hook 사용 방법: https://ko.reactjs.org/docs/hooks-overview.html
    // 쉽게 생각해, 함수 컴포넌트 안에서 state 를 사용할 수 있게 만들어 주는게 Hook 인 듯 싶다.
    // const [checked, setChecked] = useState(false);
    // const [radioValue, setRadioValue] = useState('0');

    const radios_1 = [
        { name: props.name_1, value: '1' },
        { name: props.name_2, value: '2' },
    ];
    const radios_2 = [
        { name: props.name_3, value: '3' },
        { name: props.name_4, value: '4' }
    ];
    return (
        <>
            {radios_1.map((radio, idx) => (
                <>
                    <ButtonGroup toggle className="mb-2">
                        <ToggleButton className="tg-2"
                            key={idx}
                            type="radio"
                            // variant="warning"
                            variant="warning"
                            name="radio"
                            value={radio.value}
                            // checked={radioValue === radio.value}
                            // onChange={(e) => setRadioValue(e.currentTarget.value)}
                            onChange={(e) => props.onClicked(e.currentTarget.value)}
                            size="lg"
                        // block
                        >
                            {radio.name}
                            {/* , {radio.value} */}
                            {/* , quiz num: {props.currentQuizNumber} */}
                        </ToggleButton>
                    </ButtonGroup>
                    {/* &nbsp;&nbsp;&nbsp; */}
                </>
            ))}
            <br />

            {radios_2.map((radio, idx) => (
                <>
                    <ButtonGroup toggle className="mb-2">
                        <ToggleButton className="tg-2"
                            key={idx}
                            type="radio"
                            // variant="warning"
                            variant="warning"
                            name="radio"
                            value={radio.value}
                            // checked={radioValue === radio.value}
                            // onChange={(e) => setRadioValue(e.currentTarget.value)}
                            onChange={(e) => props.onClicked(e.currentTarget.value)}
                            // onClick={() => props.SetAnswer()}
                            size="lg"
                        // block
                        >
                            {radio.name}
                            {/* , {radio.value} */}
                            {/* , quiz num: {props.currentQuizNumber} */}
                        </ToggleButton>
                        {/* &nbsp;&nbsp;&nbsp; */}
                    </ButtonGroup>
                </>
            ))}

        </>
    );
}

function CustomButton(props) {
    return (
        <Button
            className="customBtn"
            variant={props.variant}
            size="lg"
            onClick={() => props.UpdateDesc(props.id)}>
            {props.text}
        </Button>
    );
}

const quizDesc = [
    ["다음 중 문제 출제자의 이름은 무엇 일까요?"],
    ["다음 중 문제 출제자가 태어난 곳은 어디일까요?"],
    ["하루 평균 유튜브 시청 시간은 얼마 일까요?"],
    ["가장 좋아하는 음식은 무엇일까요?"],
    ["피아노를 얼마나 배웠을까요?"],
]

const quiz = [
    ["민식", "가을이", "MS", "ms"],
    ["수영구 광안동", "수영구 민락동", "수영구 망미동", "수영구 남천동"],
    ["1 시간", "2 시간", "3 시간", "4 시간"],
    ["김치", "두부", "짜장", "카레"],
    ["6 개월", "12 개월", "18 개월", "24 개월"],
];
function GetQuizDesc(QuizNumber) {
    return quiz[QuizNumber];
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state =
        {
            history: [
                { quizAnswer: Array(NUM_QUIZ).fill(null) }
            ],
            historyCount: 0,

            choiceDesc_0: quiz[0][0],
            choiceDesc_1: quiz[0][1],
            choiceDesc_2: quiz[0][2],
            choiceDesc_3: quiz[0][3],

            currentQuizNumber: 0,
            maxQuizNumber: NUM_QUIZ,
            quizEnd: false,
            text_next: "다음으로",

            // css
            top_height: 0,
            middle_font: 0,
            middle_font_2: 0,
            middle_height: 0,
        }
        this.UpdateQuizNumber = this.UpdateQuizNumber.bind(this)
        this.UpdateDesc = this.UpdateDesc.bind(this)
        this.SetNextChoiceDesc = this.SetNextChoiceDesc.bind(this)
        this.SetAnswer = this.SetAnswer.bind(this)
        this.SetCSSInfo = this.SetCSSInfo.bind(this)
    }

    UpdateQuizNumber() {
        if (this.state.currentQuizNumber === (NUM_QUIZ - 1)) {
            // alert("Quiz End");
        }

        const currentQuizNumber = this.state.currentQuizNumber + 1;
        this.setState({
            currentQuizNumber: currentQuizNumber,
        });
    }

    /* NOTE: need to refec to Array */
    SetNextChoiceDesc() {
        const quiz = GetQuizDesc(this.state.currentQuizNumber + 1).slice();
        this.setState({
            choiceDesc_0: quiz[0],
            choiceDesc_1: quiz[1],
            choiceDesc_2: quiz[2],
            choiceDesc_3: quiz[3],
        });
    }

    UpdateDesc(id) {
        const history = this.state.history.slice(0, this.state.historyCount + 1)
        const current = history[history.length - 1]
        const answers = current.quizAnswer.slice()

        // alert(answers[this.state.currentQuizNumber])
        if (answers[this.state.currentQuizNumber] === null) {
            alert("질문에 대해 답변해주세요.");
        }
        else if (this.state.currentQuizNumber === (NUM_QUIZ - 1)) {
            // alert("Quiz End");
            this.setState({
                quizEnd: true
            })
        }
        else {
            this.UpdateQuizNumber()
            this.SetNextChoiceDesc()
            if (this.state.currentQuizNumber === (NUM_QUIZ - 2)) {
                this.setState({
                    text_next: "결과 보기"
                })
            }
        }
    }

    SetAnswer(quiz_answer_num) {
        const history = this.state.history.slice(0, this.state.historyCount + 1)
        const current = history[history.length - 1]
        const answers = current.quizAnswer.slice()

        answers[this.state.currentQuizNumber] = quiz_answer_num
        this.setState({
            // concat 은,, 이어 붙이기임
            history: history.concat([{
                quizAnswer: answers,
            }]),
            historyCount: history.length,
        });
    }

    CalculateScore() {
        const history = this.state.history.slice(0, this.state.historyCount + 1);
        const current = history[history.length - 1];
        const answers = current.quizAnswer.slice();

        let score = 0;
        for (let i = 0; i < NUM_QUIZ; i++) {
            // 문자와 숫자 비교라, === 로 하면 점수 0점 나옴.
            if (answers[i] === GetQuizAnswer(i)) {
                score++;
            }
        }

        return score;
    }

    SetCSSInfo()
    {
        const innerWidth = window.innerWidth;
        // const innerHeight = window.innerHeight;
        let top_height = 0;
        let middle_font = 0;
        let middle_font_2 = 0;
        let middle_height = 0;
        
        if (innerWidth >= 500 && innerWidth < 580) // 500 ~ 580 px
        {
            top_height = 180;
            middle_font = 30;
            middle_font_2 = 20;
            middle_height = 655;
        }
        else
        {
            top_height = 210; // px
            middle_font = 35;
            middle_font_2 = 25;
            middle_height = 605;
        }

        this.setState({
            top_height: top_height,
            middle_height: middle_height,
            middle_font: middle_font,
            middle_font_2: middle_font_2,
        });
    }

    // https://ko.reactjs.org/docs/react-component.html#componentdidmount
    // MOUNT: https://ko.reactjs.org/docs/react-component.html#mounting
    componentDidMount()
    {
        // css
        this.SetCSSInfo()
    }

    render() {
        // css
        const style_top = {height: this.state.top_height };
        const style_middle = {height: this.state.middle_height};
        const style_middle_top = {"font-size": this.state.middle_font };
        const style_middle_2 = {"font-size": this.state.middle_font_2 };

        // NOTE: Quiz 종료
        if (this.state.quizEnd === true) {
            const score = this.CalculateScore();
            // alert("score: " + score)
            return (<ResultMain score={score}/>);
        }
        // NOTE: Quiz 화면
        else {
            return (
                <div className="App">
                    <div className="top" style={style_top}>
                        <img src={sms} className="App-logo" alt="logo" />
                        <div className="App-logo" alt="logo">이 친구에 대해 알아보자</div>
                    </div>
                    <div className="middle" style={style_middle}>
                        <div className="middle-top" style={style_middle_top}>
                            {this.state.currentQuizNumber + 1}단계 도전!
                            <div className="quizDesc" style={style_middle_2}>
                                {quizDesc[this.state.currentQuizNumber]}
                            </div>
                        </div>
                        <div className="middle-bottom">
                            <div>
                                <ToggleButtonExample
                                    currentQuizNumber={this.state.currentQuizNumber}
                                    name_1={this.state.choiceDesc_0}
                                    name_2={this.state.choiceDesc_1}
                                    name_3={this.state.choiceDesc_2}
                                    name_4={this.state.choiceDesc_3}

                                    onClicked={this.SetAnswer}
                                >
                                </ToggleButtonExample>
                            </div>
                            <br />
                            <div>
                                <CustomButton
                                    variant="dark"
                                    text={this.state.text_next} UpdateDesc={this.UpdateDesc}
                                >
                                </CustomButton>
                                <br />
                                <div className="text_1">
                                    {NUM_QUIZ - this.state.currentQuizNumber - 1}{"개의 문제가 남았습니다."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        안녕하세요~ 심심하면 풀어봐요.
                    </div>
                </div>
            );
        }
    };
}

function GetQuizAnswer(quizNumber) {
    const QuizAnswer = ["1", "2", "2", "2", "2"];
    return QuizAnswer[quizNumber];
}

export default Main;


import React from 'react';
import '../App.css';
import score4 from '../img/score_4.gif'
import score4_1 from '../img/score_4_1.gif'

class Result_4 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                4 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        제니 이행시
                        <div className="quizDesc">
                            제: 제가 지금 사라져 보겠습{<br/>}
                            니: 니다. (박수~)
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score4} />
                        <img className="image" src={score4_1} />
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_4;


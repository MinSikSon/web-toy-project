
import React from 'react';
import '../App.css';
import score2 from '../img/score_2.png'

class Result_2 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                2 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        2
                        <div className="quizDesc">
                            2
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score2} />
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_2;


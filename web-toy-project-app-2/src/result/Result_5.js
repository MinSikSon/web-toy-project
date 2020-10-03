
import React from 'react';
import '../App.css';
import score5 from '../img/score_5.gif'

class Result_5 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                5 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        넌 나고 난 너야
                        <div className="quizDesc">
                            난 너고 넌 나야
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score5} />
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_5;



import React from 'react';
import '../App.css';
import score3 from '../img/score_3.jpg'

class Result_3 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                3 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        잘했어~~
                        <div className="quizDesc">
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score3} />

                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_3;


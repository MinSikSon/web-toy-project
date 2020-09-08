
import React from 'react';
import '../App.css';

import score1 from '../img/score_1.jpg'

class Result_1 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                1 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        대다나다!
                        <div className="quizDesc">
                            !!
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score1} />
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_1;


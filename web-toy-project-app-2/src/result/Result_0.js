
import React from 'react';
import '../App.css';

import score0 from '../img/score_0.jpg'

class Result_0 extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="top">
                    0 점
                </div>
                <div className="middle">
                    <div className="middle-top">
                        엉엉엉엉
                        <div className="quizDesc">
                            엉엉엉엉
                        </div>
                    </div>
                    <div className="middle-bottom">
                        <img className="image" src={score0}/>
                    </div>
                </div>
                <div className="bottom">
                </div>
            </div>
        );
    }
}

export default Result_0;


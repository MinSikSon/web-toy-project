import React from 'react';
import '../App.css';

import { Result_0, Result_1, Result_2, Result_3, Result_4, Result_5 } from '.';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';

function CopyButton(props) {
    return (
        <CopyToClipboard className="floatBtn" text={props.url}>
            <Button variant="dark" onClick={() => props.PopUp(props.url)}>URL COPY!!</Button>
        </CopyToClipboard>
    );
}

class ResultMain extends React.Component {
    constructor(props) {
        super(props)
    }

    PopUp(url) {
        alert(url + " 이 복사 되었습니다.")
    }

    render() {
        let url = window.location.href;
        // return(<div></div>)
        switch (this.props.score) {
            case 0:
                url += "result_0/";
                // console.log(url)
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_0 />
                </div>);
            case 1:
                url += "result_1/";
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_1 />
                </div>);
            case 2:
                url += "result_2/";
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_2 />
                </div>);
            case 3:
                url += "result_3/";
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_3 />
                </div>);
            case 4:
                url += "result_4/";
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_4 />
                </div>);
            case 5:
                url += "result_5/";
                return (<div>
                    <CopyButton url={url} PopUp={this.PopUp}/>
                    <Result_5 />
                </div>);

            default:
                alert("Error");
                break;
        }
    };
}

export default ResultMain;
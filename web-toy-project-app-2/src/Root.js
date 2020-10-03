import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'

// NOTE: 아래 code 들과 기능적으로 동일. 간단하게 나타내기 위해 아래 처럼 사용함.
const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

// function Root()
// {
//     return(
//         <BrowserRouter>
//         <App/>
//         </BrowserRouter>
//     );
// }

// class Root extends React.Component
// {
//     render()
//     {
//         return(
//             <BrowserRouter>
//             <App/>
//             </BrowserRouter>
//         );
//     }
// }

export default Root;
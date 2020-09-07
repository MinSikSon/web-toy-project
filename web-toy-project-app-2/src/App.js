import React from 'react';
import {Route} from 'react-router-dom';

import {Main} from './pages';
import {ResultMain, Result_0, Result_1, Result_2, Result_3, Result_4, Result_5} from './result';

class App extends React.Component
{
  render(){
    return(
      <div>
        <Route exact path="/" component={Main}/>
        <Route exact path="/resultMain" component={ResultMain}/>
        <Route exact path="/result_0" component={Result_0}/>
        <Route exact path="/result_1" component={Result_1}/>
        <Route exact path="/result_2" component={Result_2}/>
        <Route exact path="/result_3" component={Result_3}/>
        <Route exact path="/result_4" component={Result_4}/>
        <Route exact path="/result_5" component={Result_5}/>
      </div>
    );
  }
}

export default App;
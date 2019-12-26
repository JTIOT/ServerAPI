import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ResetPassword from './components/resetPassword/resetPassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={()=><div>hello</div>} />
        <Route exact path='/resetPassword/:userId/:token' component={ResetPassword} />
      </Switch>    
    </div>
  );
}

export default App;

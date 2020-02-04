import React from 'react';
import {Switch, Route} from 'react-router-dom';
import QRCodeReader from './pages/qr-reader/qr-reader';
import ResetPassword from './pages/resetPassword/resetPassword';
import DeviceDispatch from './pages/device-dispatch/deviceDispatch';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/qrcode-scanner/' component={QRCodeReader} />
        <Route exact path='/resetPassword/:userId/:token' component={ResetPassword} />
        <Route exact path='/dispatchSys' component={DeviceDispatch} />
        <Route path='*' render={()=><div>Page not found</div>} />
      </Switch>    
    </div>
  );
}

export default App;

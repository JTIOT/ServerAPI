import React, {Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
// import QRCodeReader from './pages/qr-reader/qr-reader';
// import ResetPassword from './pages/resetPassword/resetPassword';
import DeviceDispatch from './pages/device-dispatch/deviceDispatch';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import ManageDeivce from './pages/manage-device/manageDevice';
import { Loader } from 'semantic-ui-react'

function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loader active inline='centered' size='large' />}>
        <Switch>
          {/* <Route exact path='/qrcode-scanner/' component={QRCodeReader} /> */}
          {/* <Route exact path='/resetPassword/:userId/:token' component={ResetPassword} /> */}
          <Route exact path='/dispatchSys' component={DeviceDispatch} />
          <Route exact path='/manageDevice' component={ManageDeivce} />
          <Route path='*' render={()=><div>Page not found</div>} />
        </Switch>  
      </Suspense>  
    </div>
  );
}

export default App;

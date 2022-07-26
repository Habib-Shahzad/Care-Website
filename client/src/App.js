import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss';
import RoutesFile from './_Routes';
import 'swiper/scss'; // core Swiper
// import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/scss/navigation';
// import 'swiper/modules/pagination/pagination.scss';
import 'swiper/scss/pagination';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="*">
          <RoutesFile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
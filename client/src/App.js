import React from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import RoutesFile from './RoutesFile';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Footer, MainNavbar } from './components';
import { Home, EventsCamp, PatientWelfare } from './pages';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination'; // Pagination module
import './App.scss';
import './global.scss';


function App() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <MainNavbar />
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>




          <Route path="/events" element=
            {
              <>
                <EventsCamp />
                <Footer />
              </>
            } />

          <Route path="/patient-welfare" element=
            {
              <>
                <PatientWelfare />
                <Footer />
              </>
            } />


          <Route path="*" element={
            <>
              <Home />
              <Footer />
            </>
          } />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}



export default App;
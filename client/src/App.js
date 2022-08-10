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
import { Home, CommunityOutreach, PatientWelfare, OurTeam, OurAims, OurActivities} from './pages';
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


          <Route path="/community-outreach" element=
            {
              <>
                <CommunityOutreach />
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
          
          <Route path="/our-team" element=
            {
              <>
                <OurTeam />
                <Footer />
              </>
            } />
          
          <Route path="/our-aims" element=
            {
              <>
                <OurAims />
                <Footer />
              </>
            } />
          
          <Route path="/our-activities" element=
            {
              <>
                <OurActivities />
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
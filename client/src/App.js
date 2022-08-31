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
import { Home, CommunityOutreach, PatientWelfare, OurTeam, OurAims, OurActivities } from './pages';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination'; // Pagination module
import './App.scss';
import './global.scss';
import api from "./api";

import AdminUserContext from './contexts/adminUser';
import { Admin } from "./admin";


function App() {
  const location = useLocation();

  const [adminUserState, setAdminUserState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);



  React.useEffect(() => {
    (async () => {

      const response = await fetch(`${api}/user/loggedIn`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        credentials: "include",
        withCredentials: true,
      });

      const content = await response.json();

      if (content.successAdmin) {
        setAdminUserState(content.admin_user);
      }

      setLoading(false);
    })();
  }, []);

  return (

    <AdminUserContext.Provider
      value={{ adminUserState: adminUserState, setAdminUserState: setAdminUserState }}
    >
      <TransitionGroup component={null}>

        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>

            <Route path="/admin" element=
              {
                <>
                  <Admin loading={loading} />
                </>
              } />

            <Route path="/community-outreach" element=
              {
                <>
                  <MainNavbar />
                  <CommunityOutreach />
                  <Footer />
                </>
              } />

            <Route path="/patient-welfare" element=
              {
                <>
                  <MainNavbar />
                  <PatientWelfare />
                  <Footer />
                </>
              } />

            <Route path="/our-team" element=
              {
                <>
                  <MainNavbar />
                  <OurTeam />
                  <Footer />
                </>
              } />

            <Route path="/our-aims" element=
              {
                <>
                  <MainNavbar />
                  <OurAims />
                  <Footer />
                </>
              } />

            <Route path="/our-activities" element=
              {
                <>
                  <MainNavbar />
                  <OurActivities />
                  <Footer />
                </>
              } />


            <Route path="*" element={
              <>
                <MainNavbar />
                <Home />
                <Footer />
              </>
            } />
          </Routes>
        </CSSTransition>
      </TransitionGroup>

    </AdminUserContext.Provider>
  );
}



export default App;
import React from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";
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

            <Route path="admin/*" element=
              {
                <>
                  <Admin loading={loading} />
                </>
              } />

          </Routes>
        </CSSTransition>
      </TransitionGroup>

    </AdminUserContext.Provider>
  );
}



export default App;
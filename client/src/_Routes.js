import React from 'react';
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { MainNavbar, Footer } from './components';
import { Home } from './pages';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import './form.scss';
import './global.scss';

function RoutesFile(props) {

    let location = useLocation();

    return (
        <div>
            {/* <MainNavbar /> */}
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <div className="page">
                        <MainNavbar />
                        <Switch location={location}>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                        <Footer />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default RoutesFile;
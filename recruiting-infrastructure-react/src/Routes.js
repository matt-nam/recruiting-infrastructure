import React from "react";

import { Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Recruiting from "components/recruiting"

const routes = [
    // { path: '/', name: 'Home', Component: Home },
    { path: '/', name: "Recruiting", Component: Recruiting}
]

/**
 * This component merely defines the routes. 
 * 
 * The actual application is only wrapped by BrowserRouter in App.js.
 * This had to be done to allow fade transitions between pages.
 * 
 * See: http://reactcommunity.org/react-transition-group/with-react-router
 * See: https://reactjs.org/docs/animation.html
 * See: https://css-tricks.com/animating-between-views-in-react/
 */
export default function Routes() {

    const location = useLocation();
    const { pathname, key } = location

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={key}
                timeout={300}
                classNames="anim-page"
                unmountOnExit>
                <div className="anim-page">
                    <Switch location={location}>
                        {routes.map(({ path, Component }) => (
                            <Route key={path} exact path={path} component={Component} />
                        ))}
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </div>
            </CSSTransition >
        </TransitionGroup>
    )
}

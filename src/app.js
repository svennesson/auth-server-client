import './less/app.less'

import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { IndexRedirect, Router, Route, IndexRoute } from 'react-router'

import Components from './components/index'

const history = createBrowserHistory()
history.listen(location => {
    // Use setTimeout to make sure this runs after React Router's own listener
    setTimeout(() => {
        // Keep default behavior of restoring scroll position when user:
        // - clicked back button
        // - clicked on a link that programmatically calls `history.goBack()`
        // - manually changed the URL in the address bar (here we might want
        // to scroll to top, but we can't differentiate it from the others)
        if (location.action === 'POP') {
            return
        }

        // In all other cases, check fragment/scroll to top
        const hash = window.location.hash
        if (hash !== '') {
            const element = document.querySelector(hash)
            if (element != null) {
                element.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                })
            }
        } else {
            window.scrollTo(0, 0)
        }
    })
})

const {
    Main,
    Register,
    Login,
    Timestampz
} = Components

const app = (
    <Router history={history}>
        <Route path='/' component={Main}>
            <Route path='login' component={Login} />
            <Route path='register' component={Register} />
            <Route path='timestamps' component={Timestampz} />
            <IndexRoute component={Login} />
        </Route>
    </Router>
)

render(app, document.getElementById('content'))

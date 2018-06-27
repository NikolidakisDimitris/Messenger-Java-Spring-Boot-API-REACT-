import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import { App } from './components/App'
import { Whoops404 } from './components/Whoops404'

render(
    <HashRouter>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/messages' component={App} />
                <Route path='/sendmsg' component={App} /> 
                <Route path='/adminpanel' component={App} /> 
                <Route path='/profile' component={App} /> 
                <Route path='/about' component={App} /> 

                <Route path='*' component={Whoops404} />
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById('react-container')
)
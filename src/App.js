import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './pages/Home'
import Counter from './pages/Counter'
import Layout from './Layout'
function App () {
  return (
    <Router history={hashHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="counter" component={Counter} />
      </Route>
    </Router>
  )
}

export default App

import * as React from "react"
import { Router, hashHistory, Route } from 'react-router'
import { Layout } from './layout/index'
export default class extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='*' component={Layout}></Route>
      </Router>
    )
  }
}
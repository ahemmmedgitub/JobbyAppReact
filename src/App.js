import {Redirect, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Job/job'
import JobItemDetails from './components/JobItemDetails/index'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/random-path" component={NotFound} />
    <Redirect to="random-path" />
  </Switch>
)

export default App

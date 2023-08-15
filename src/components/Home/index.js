import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="login" />
    }
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <div className="text-container">
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary, information,
              company review.Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link-elements">
              <button type="button" className="find-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home

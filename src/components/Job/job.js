import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

import './job.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobApiStatusConstants = {
  initial: 'initial',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  returnEmptyList: 'FALSE',
}

class Jobs extends Component {
  state = {
    profileList: [],
    jobsList: [],
    profileStatues: false,
    jobApiStatues: jobApiStatusConstants.initial,
    employmentType: '',
    salaryRange: '',
    takingSearchInput: '',
    inputSearch: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getEmploymentId = employmentTypeId => {
    this.setState({employmentType: employmentTypeId}, this.getJobDetails)
  }

  getSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobDetails)
  }

  getSearchedInput = event => {
    this.setState({takingSearchInput: event.target.value})
  }

  clickedOnSearchIcon = () => {
    const {takingSearchInput} = this.state

    this.setState({inputSearch: takingSearchInput}, this.getJobDetails)
  }

  getJobDetails = async () => {
    const {employmentType, salaryRange, inputSearch} = this.state

    this.setState({
      jobApiStatues: jobApiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${inputSearch}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    const listLength = fetchedData.total === 0

    if (listLength === true) {
      this.setState({jobApiStatues: jobApiStatusConstants.returnEmptyList})
    } else if (response.ok === true) {
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        jobApiStatues: jobApiStatusConstants.success,
      })
    } else {
      this.setState({
        jobApiStatues: jobApiStatusConstants.failure,
      })
    }
  }

  onClickedRetryBtn = () => {
    this.setState({profileStatues: false}, this.getProfileDetails)
  }

  getProfileDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: profileDetails,
      })
    } else {
      this.setState({profileStatues: true})
    }
  }

  profileDetails = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="user-img" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  retryBtn = () => (
    <div className="failure-profile-api">
      <button
        onClick={this.onClickedRetryBtn}
        className="retry-btn"
        type="button"
        data-testid="searchButton"
      >
        Retry
      </button>
    </div>
  )

  onDisplayProfileDetails = () => {
    const {profileStatues} = this.state

    return <div>{profileStatues ? this.retryBtn() : this.profileDetails()}</div>
  }

  onFailureJobApiSubmit = () => (
    <div className="job-item-details-container">
      <Header />
      <div className="job-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">Opps! Something Went Wrong</h1>
        <p className="description">
          We cannot see to find the page your are looking for.
        </p>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  onSuccessJobApi = () => {
    const {jobsList} = this.state

    return (
      <div className="job-details-container">
        <div className="search-input-logo-container">
          <input
            onChange={this.getSearchedInput}
            placeholder="Search"
            className="search-input"
            type="search"
          />
          <button
            data-testid="searchButton"
            className="search-btn"
            type="button"
          >
            <AiOutlineSearch
              className="search-icon"
              onClick={this.clickedOnSearchIcon}
            />
          </button>
        </div>
        <ul className="each-job-details-container">
          {jobsList.map(eachItem => (
            <JobCard eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  onProgressStageApi = () => (
    <div className="job-details-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  noMatchingJobsComponent = () => (
    <div className="no-jobs-bg-container">
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-img"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    </div>
  )

  onFinalResults = () => {
    const {jobApiStatues} = this.state

    switch (jobApiStatues) {
      case jobApiStatusConstants.success:
        return this.onSuccessJobApi()
      case jobApiStatusConstants.failure:
        return this.onFailureJobApiSubmit()
      case jobApiStatusConstants.inProgress:
        return this.onProgressStageApi()
      case jobApiStatusConstants.returnEmptyList:
        return this.noMatchingJobsComponent()
      default:
        return null
    }
  }

  render() {
    const {jobApiStatues} = this.state
    console.log(jobApiStatues)

    return (
      <div className="job-main-container">
        <Header />
        <div className="job-container">
          <div className="profile-salary-employment-container">
            {this.onDisplayProfileDetails()}
            <hr />
            <div className="type-of-employment">
              <h1 className="heading-employment">Type of Employment</h1>
              <ul className="employment-type">
                {employmentTypesList.map(employmentType => (
                  <TypeOfEmployment
                    employmentType={employmentType}
                    key={employmentType.employmentTypeId}
                    getEmploymentId={this.getEmploymentId}
                  />
                ))}
              </ul>
            </div>
            <hr />

            <div className="salary-range-container">
              <h1 className="heading-employment">Salary Range</h1>
              <ul className="salary-type">
                {salaryRangesList.map(salaryRange => (
                  <SalaryRange
                    salaryRange={salaryRange}
                    key={salaryRange.salaryRangeId}
                    getSalaryRange={this.getSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="job-details-container">{this.onFinalResults()}</div>
        </div>
      </div>
    )
  }
}
export default Jobs

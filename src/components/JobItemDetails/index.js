import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SkillCard from '../SkillCard/index'
import SimilarJobCard from '../SimilarJobCard/index'

import './index.css'

const apiStatuesConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsList: [],
    similarJobsList: [],
    apiStatues: apiStatuesConstants.initial,
    skillList: [],
    pageId: '',
  }

  componentDidMount() {
    this.getClickedJobDetails()
  }

  onClickedJobItemBtn = () => {
    const {pageId} = this.state

    const {history} = this.props

    history.replace(`/jobs/${pageId}`)
  }

  getClickedJobDetails = async () => {
    this.setState({apiStatues: apiStatuesConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({pageId: id})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updetedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        companyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const updatedSkillList = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailsList: updetedJobDetails,
        similarJobsList: updatedSimilarJobs,
        skillList: updatedSkillList,
        apiStatues: apiStatuesConstants.success,
      })
    } else {
      this.setState({
        apiStatues: apiStatuesConstants.failure,
      })
    }
  }

  onSuccessfulApiSubmit = () => {
    const {jobDetailsList, skillList, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
      companyDescription,
      lifeAtCompanyUrl,
    } = jobDetailsList

    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-container">
          <div className="job-card-container">
            <div className="company-logo-title-rating-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-description-contain">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiTwotoneStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-job-type-salary-container">
              <div className="location-job-type-container">
                <MdLocationOn className="react-icons" />
                <p className="location">{location}</p>
                <p className="employment-type">{employmentType}</p>
              </div>
              <div className="salary-container">
                <p className="salary">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="description-container">
              <div className="description-visit-container">
                <h1 className="description-heading">Description</h1>
                <div className="visit-container">
                  <a className="visit" href={companyWebsiteUrl}>
                    Visit
                  </a>
                  <BsBoxArrowUpRight className="visit-logo" />
                </div>
              </div>
              <p className="description">{jobDescription}</p>
            </div>
            <h1 className="skills">Skills</h1>
            <ul className="skill-container">
              {skillList.map(eachSkill => (
                <SkillCard eachSkill={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <h1 className="skills">Life at Company</h1>
            <div className="life-at-company-container">
              <div className="life-at-company-description-container">
                <p className="company-description">{companyDescription}</p>
              </div>
              <img
                src={lifeAtCompanyUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
          <div className="similar-job-main-container">
            <h1 className="skills">Similar Jobs</h1>
            <div className="similar-jobs-container">
              {similarJobsList.map(eachItem => (
                <SimilarJobCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onFailureApiSubmit = () => (
    <div className="job-item-details-container">
      <Header />
      <div className="job-item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          onClick={this.onClickedJobItemBtn}
          type="button"
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  onProgressStageApi = () => (
    <div className="job-item-details-container">
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apiStatues} = this.state

    switch (apiStatues) {
      case apiStatuesConstants.success:
        return this.onSuccessfulApiSubmit()
      case apiStatuesConstants.failure:
        return this.onFailureApiSubmit()
      case apiStatuesConstants.inProgress:
        return this.onProgressStageApi()
      default:
        return null
    }
  }
}

export default JobItemDetails

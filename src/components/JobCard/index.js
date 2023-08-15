import {Link} from 'react-router-dom'

import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <div className="job-card-container">
        <div className="company-logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard

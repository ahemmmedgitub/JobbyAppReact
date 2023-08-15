import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem

  return (
    <div className="similar-card-container">
      <div className="company-logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="similar-job-description">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-job-type-container">
        <div className="react-icons-container">
          <MdLocationOn className="react-icons" />
          <p className="location">{location}</p>
        </div>
        <div className="react-icons-container">
          <MdLocationOn className="react-icons" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard

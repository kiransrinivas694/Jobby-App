import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props
  const updatedJobs = {
    companyLogoUrl: similarJobs.company_logo_url,
    employmentType: similarJobs.employment_type,
    id: similarJobs.id,
    jobDescription: similarJobs.job_description,

    location: similarJobs.location,
    rating: similarJobs.rating,
    title: similarJobs.title,
  }

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    title,
    location,
    rating,
  } = updatedJobs

  return (
    <li className="similar-jobs-list-item">
      <div className="similar-job-item-logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-item-image"
        />
        <div className="similar-jobs-item-title-and-rating-container">
          <h1 className="similar-job-item-title">{title}</h1>
          <div className="similar-job-item-rating-and-star">
            <AiFillStar className="similar-job-item-star-icon" />
            <p className="similar-job-item-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-job-item-location-type-package-container">
        <div className="similar-job-item-location-container">
          <MdLocationOn className="similar-job-item-icon" />
          <p>{location}</p>
        </div>
        <div className="similar-job-item-employment-type-container">
          <BsBriefcaseFill className="similar-job-item-icon" />
          <p>{employmentType}</p>
        </div>
      </div>
      <hr className="line-separator" />
      <h1 className="similar-job-item-description-text">Description</h1>
      <p className="similar-job-item-description">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobs

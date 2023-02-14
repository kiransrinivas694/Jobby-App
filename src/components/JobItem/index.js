import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const updatedJobItem = {
    companyLogoUrl: jobItem.company_logo_url,
    employmentType: jobItem.employment_type,
    id: jobItem.id,
    jobDescription: jobItem.job_description,
    packagePerAnnum: jobItem.package_per_annum,
    location: jobItem.location,
    rating: jobItem.rating,
    title: jobItem.title,
  }

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = updatedJobItem

  return (
    <Link to={`jobs/${id}`} className="job-item-link">
      <li className="jobs-list-item">
        <div className="job-item-logo-and-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-image"
          />
          <div className="jobs-item-title-and-rating-container">
            <p className="job-item-title">{title}</p>
            <div className="job-item-rating-and-star">
              <AiFillStar className="job-item-star-icon" />
              <p className="job-item-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-location-type-package-container">
          <div className="job-item-location-container">
            <MdLocationOn className="job-item-icon" />
            <p>{location}</p>
          </div>
          <div className="job-item-employment-type-container">
            <BsBriefcaseFill className="job-item-icon" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line-separator" />
        <p className="job-item-description-text">Description</p>
        <p className="job-item-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem

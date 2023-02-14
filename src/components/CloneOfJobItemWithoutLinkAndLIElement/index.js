import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {ImShare} from 'react-icons/im'

import './index.css'

const CloneOfJobItemWithoutLinkAndLIElement = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = jobDetails

  return (
    <>
      <div className="job-item-logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
      <div className="description-and-visit-container">
        <h1 className="job-item-description-text">Description</h1>
        <div className="visit-text-and-icon">
          <a href={companyWebsiteUrl} className="visit-text">
            Visit
          </a>
          <ImShare className="share-icon" />
        </div>
      </div>

      <p className="job-item-description">{jobDescription}</p>
    </>
  )
}

export default CloneOfJobItemWithoutLinkAndLIElement

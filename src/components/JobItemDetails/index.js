import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import CloneOfJobItemWithoutLinkAndLIElement from '../CloneOfJobItemWithoutLinkAndLIElement'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skills: [],
    lifeAtCompany: [],

    isStatus: statusConstants.loading,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  onRenderOfFailure = () => (
    <div className="job-item-details-failure-container">
      <div className="job-item-details-failure-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-details-image"
        />
        <h1 className="failure-item-details-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="failure-item-details-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="item-details-failure-retry-button"
          onClick={this.getUserDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  onRenderOfSuccess = () => {
    const {jobDetails, similarJobs, skills, lifeAtCompany} = this.state

    const {description, lifeImageURl} = lifeAtCompany

    return (
      <div className="job-details-body-container">
        <div className="job-details-upper-content-container">
          <CloneOfJobItemWithoutLinkAndLIElement
            jobDetails={jobDetails}
            key={jobDetails.id}
          />
          <div>
            <h1 className="skills-text">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <Skills skills={each} key={each.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="life-at-company-text">Life At Company</h1>
            <div className="life-at-company-details-container">
              <p className="life-description">{description}</p>
              <img
                src={lifeImageURl}
                alt="life at company"
                className="lifeImage"
              />
            </div>
          </div>
        </div>
        <div className="job-details-bottom-container">
          <h1 className="similar-jobs-text">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(each => (
              <SimilarJobs similarJobs={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onFailure = () => {
    this.setState({isStatus: 'FAILURE'})
  }

  onSuccess = async response => {
    const data = await response.json()

    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    console.log(updatedData)

    const {jobDetails, similarJobs} = updatedData
    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      skills: jobDetails.skills,

      lifeAtCompany: jobDetails.life_at_company,

      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }

    const updatedLifeAtCompany = {
      description: updatedJobDetails.lifeAtCompany.description,
      lifeImageURl: updatedJobDetails.lifeAtCompany.image_url,
    }
    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs,
      skills: updatedJobDetails.skills,
      lifeAtCompany: updatedLifeAtCompany,

      isStatus: statusConstants.success,
    })
  }

  getUserDetails = async () => {
    this.setState({isStatus: statusConstants.loading})
    const {match} = this.props
    const {params} = match
    console.log(params)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      this.onSuccess(response)
    } else {
      this.onFailure()
    }
  }

  onLoading = () => (
    <div className="loader-container-job-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRenderOf = () => {
    const {isStatus} = this.state
    switch (isStatus) {
      case statusConstants.success:
        return this.onRenderOfSuccess()
      case statusConstants.failure:
        return this.onRenderOfFailure()
      case statusConstants.loading:
        return this.onLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.onRenderOf()}
      </>
    )
  }
}

export default JobItemDetails

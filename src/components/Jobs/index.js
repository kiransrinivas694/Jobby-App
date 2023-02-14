import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import JobItem from '../JobItem'

import Header from '../Header'
import './index.css'

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

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    userProfileDetails: [],
    jobsList: [],
    searchInput: '',
    searchText: '',
    employmentChecked: [],
    salaryChecked: [],
    isGetJobsSuccess: statusConstants.loading,
    isGetUserDetails: statusConstants.loading,
  }

  componentDidMount() {
    this.onGetUserDetails()
    this.onGetJobsList()
  }

  onBlurOfInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchIconClick = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.onGetJobsList)
  }

  onEmploymentChange = event => {
    const {employmentChecked} = this.state
    const isChecked = event.target.checked
    const isEmploymentType = event.target.name
    console.log(isChecked)
    console.log(isEmploymentType)
    console.log(employmentChecked)

    if (isChecked === true) {
      const newEmploymentChecked = [...employmentChecked, isEmploymentType]

      this.setState(
        {employmentChecked: newEmploymentChecked},
        this.onGetJobsList,
      )
    } else {
      const newEmploymentChecked = employmentChecked.filter(
        each => each !== isEmploymentType,
      )

      this.setState(
        {employmentChecked: newEmploymentChecked},
        this.onGetJobsList,
      )
    }
  }

  onSalaryInputChange = event => {
    const {salaryChecked} = this.state
    const isChecked = event.target.checked
    const isSalaryPrice = event.target.name

    if (isChecked === true) {
      const newSalaryChecked = [...salaryChecked, isSalaryPrice]

      this.setState({salaryChecked: newSalaryChecked}, this.onGetJobsList)
    } else {
      const newSalaryChecked = salaryChecked.filter(
        each => each !== isSalaryPrice,
      )

      this.setState({salaryChecked: newSalaryChecked}, this.onGetJobsList)
    }
  }

  onGetJobsList = async () => {
    const {
      searchText,
      employmentChecks,
      salaryChecks,
      employmentChecked,
      salaryChecked,
    } = this.state
    const orderedSalaryChecked = salaryChecked.sort()
    console.log(orderedSalaryChecked)
    const stringOfEmploymentType = employmentChecked.join(',')
    const stringOfSalaryType = orderedSalaryChecked.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${stringOfEmploymentType}&minimum_package=${stringOfSalaryType}&search=${searchText}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    console.log(response)
    if (response.ok === true) {
      this.onSuccessOfGetJobs(response)
    } else {
      this.onFailureOfGetJobs()
    }
  }

  onGetUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        userProfileDetails: updatedData,
        isGetUserDetails: statusConstants.success,
      })
    } else {
      this.setState({isGetUserDetails: statusConstants.failure})
    }
  }

  getUserProfileDetails = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="user-image" />
        <p className="users-name">{name}</p>
        <p className="users-bio">{shortBio}</p>
      </div>
    )
  }

  onNoJobsFound = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <p className="no-jobs-text">No Jobs Found</p>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  onJobsFound = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => (
          <JobItem jobItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onSuccessOfGetJobs = async response => {
    const data = await response.json()

    const jobsList = data.jobs

    this.setState({jobsList, isGetJobsSuccess: statusConstants.success})
  }

  onFailureOfGetJobs = () => {
    this.setState({isGetJobsSuccess: statusConstants.failure})
  }

  onRenderOfSuccessOf = () => {
    const {jobsList, isGetJobsSuccess} = this.state
    let isJobsPresent
    if (jobsList.length === 0) {
      return this.onNoJobsFound()
    }
    return this.onJobsFound()
  }

  onRenderOfFailureOf = () => (
    <div className="job-details-failure-container">
      <div className="job-details-failure-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-details-image"
        />
        <h1 className="failure-details-heading">Oops! Something Went Wrong</h1>
        <p className="failure-details-description">
          We cannot seem to find the page you are looking for
        </p>
      </div>
    </div>
  )

  onUserDetailsFail = () => (
    <div className="user-details-fail-container">
      <button
        type="button"
        className="user-details-fail-button"
        onClick={this.onGetUserDetails}
      >
        Retry
      </button>
    </div>
  )

  onInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onUserDetailsLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onJobListLoading = () => (
    <div className="loader-container-jobs-list" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getUserDetails = () => {
    const {isGetUserDetails} = this.state
    switch (isGetUserDetails) {
      case statusConstants.success:
        return this.getUserProfileDetails()
      case statusConstants.failure:
        return this.onUserDetailsFail()
      case statusConstants.loading:
        return this.onUserDetailsLoading()
      default:
        return null
    }
  }

  getJobsList = () => {
    const {isGetJobsSuccess} = this.state
    switch (isGetJobsSuccess) {
      case statusConstants.success:
        return this.onRenderOfSuccessOf()
      case statusConstants.failure:
        return this.onRenderOfFailure()
      case statusConstants.loading:
        return this.onJobListLoading()
      default:
        return null
    }
  }

  render() {
    const {
      jobsList,
      searchInput,
      searchText,
      salaryChecked,
      isGetJobsSuccess,
      isGetUserDetails,
    } = this.state

    return (
      <>
        <Header />
        <div className="jobs-route-body-container">
          <div className="jobs-content-container">
            <div className="jobs-side-bar">
              <div className="side-bar-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="jobs-search-input"
                  onBlur={this.onBlurOfInput}
                  onChange={this.onInputChange}
                  value={searchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={this.onSearchIconClick}
                >
                  <BsSearch className="search-icon-jobs" />
                </button>
              </div>
              {this.getUserDetails()}
              <hr className="separator" />
              <div>
                <p className="type-of-employment-text">Type of Employment</p>
                <ul className="employment-types-container">
                  {employmentTypesList.map(each => (
                    <li className="list-item">
                      <input
                        type="checkbox"
                        id={each.employmentTypeId}
                        name={each.employmentTypeId}
                        onChange={this.onEmploymentChange}
                      />
                      <label htmlFor={each.employmentTypeId} className="label">
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="separator" />
              <div>
                <p className="type-of-employment-text">Salary Range</p>
                <ul className="employment-types-container">
                  {salaryRangesList.map(each => (
                    <li className="list-item">
                      <input
                        type="checkbox"
                        id={each.salaryRangeId}
                        name={each.salaryRangeId}
                        onChange={this.onSalaryInputChange}
                      />
                      <label htmlFor={each.salaryRangeId} className="label">
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-list-right-container">
              <div className="right-bar-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="jobs-search-input"
                  onBlur={this.onBlurOfInput}
                  value={searchInput}
                  onChange={this.onInputChange}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={this.onSearchIconClick}
                >
                  <BsSearch className="search-icon-jobs" />
                </button>
              </div>
              {this.getJobsList()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

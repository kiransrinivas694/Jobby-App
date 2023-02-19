import './index.css'

const EmploymentTypeList = props => {
  const {details, onEmploymentChange} = props
  const {employmentTypeId, label} = details

  const employmentChange = event => {
    onEmploymentChange(event)
  }

  return (
    <li className="list-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        name={employmentTypeId}
        onChange={employmentChange}
      />
      <label htmlFor={employmentTypeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeList

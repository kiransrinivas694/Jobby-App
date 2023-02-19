const SalaryTypeList = props => {
  const {details, onSalaryInputChange} = props
  const {salaryRangeId, label} = details

  const salaryInputChange = event => {
    onSalaryInputChange(event)
  }

  return (
    <li className="list-item">
      <input
        type="radio"
        id={salaryRangeId}
        name={salaryRangeId}
        onChange={salaryInputChange}
      />
      <label htmlFor={salaryRangeId} className="label">
        {label}
      </label>
    </li>
  )
}

export default SalaryTypeList

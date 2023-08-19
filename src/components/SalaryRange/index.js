import './index.css'

const SalaryRange = props => {
  const {salaryRange, getSalaryRange} = props
  const {salaryRangeId, label} = salaryRange

  const sendSalaryId = () => {
    getSalaryRange(salaryRangeId)
  }

  return (
    <li className="salary-employment">
      <input
        value={salaryRangeId}
        className="salary-id"
        type="radio"
        id={salaryRangeId}
        onClick={sendSalaryId}
      />
      <label className="salary-label-element" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange

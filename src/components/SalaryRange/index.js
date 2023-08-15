import './index.css'

const SalaryRange = props => {
  const {salaryRange, getSalaryRange} = props
  const {salaryRangeId, label} = salaryRange

  const sendSalaryId = () => {
    getSalaryRange(salaryRangeId)
  }

  return (
    <li className="salary-employment">
      <input className="salary-id" type="radio" id={salaryRangeId} />
      <label
        className="label-element"
        htmlFor={salaryRangeId}
        onClick={sendSalaryId}
      >
        {label}
      </label>
    </li>
  )
}

export default SalaryRange

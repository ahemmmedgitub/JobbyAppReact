import './index.css'

const TypeOfEmployment = props => {
  const {employmentType, getEmploymentId} = props
  const {label, employmentTypeId} = employmentType

  const sendClickedId = () => {
    getEmploymentId(employmentTypeId)
  }

  return (
    <li className="type-employment">
      <input
        className="checkBox"
        type="checkbox"
        id={employmentTypeId}
        onClick={sendClickedId}
      />
      <label className="label-element" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmployment

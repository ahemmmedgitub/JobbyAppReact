import './index.css'

const SkillCard = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill

  return (
    <div className="skill-card-container">
      <img src={imageUrl} alt={name} className="skill-logo" />
      <p className="skill-name">{name}</p>
    </div>
  )
}

export default SkillCard
